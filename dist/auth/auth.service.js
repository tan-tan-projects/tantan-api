var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, randomUUID } from 'crypto';
import ms from 'ms';
import { OAuth2Client } from 'google-auth-library';
import { RepoService } from '../shares/repo/repo.service.js';
import { Session } from '../sessions/entities/session.entity.js';
import { User } from '../users/entities/user.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
import { Raw } from 'typeorm';
import { MobileAuthCode } from '../sessions/entities/mobile-auth-code.entity.js';
let AuthService = class AuthService {
    config;
    repo;
    jwtService;
    LOGGER;
    constructor(config, repo, jwtService, logger) {
        this.config = config;
        this.repo = repo;
        this.jwtService = jwtService;
        this.LOGGER = logger.create('Middleware');
    }
    login(state) {
        try {
            const { clientId, redirectUrl } = this.config.getOrThrow('oauth');
            const params = new URLSearchParams({
                client_id: clientId,
                redirect_uri: redirectUrl,
                response_type: 'code',
                scope: 'openid email profile',
                state,
            });
            return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        }
        catch (error) {
            this.LOGGER.error('[OAuth login error]');
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
    getCookie(req, name, redirect = false) {
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader)
            return undefined;
        const cookies = cookieHeader
            .split(';')
            .map(cookie => cookie.trim())
            .filter(cookie => cookie.startsWith(`${name}=`));
        if (cookies.length !== 1)
            return undefined;
        const value = cookies[0].slice(name.length + 1);
        return redirect ? decodeURIComponent(value) : value;
    }
    async getUser(email) {
        try {
            const now = new Date();
            const user = await this.repo.getRepository(User).findOne({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    is_active: true
                },
                where: {
                    email,
                    role: 'admin',
                    expires_at: Raw((alias) => `(${alias} IS NULL OR ${alias} > :now)`, { now })
                }
            });
            if (!user)
                throw new HttpException('User not verified', HttpStatus.BAD_REQUEST);
            if (!user.is_active)
                throw new HttpException('User inactive', HttpStatus.BAD_REQUEST);
            return user;
        }
        catch (error) {
            error.__name = 'get-user';
            throw error;
        }
    }
    async generateToken(user, isMobile = false) {
        try {
            const jwtid = randomUUID();
            const { secret, expiresIn } = this.config.getOrThrow('jwt');
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            const access_token = this.jwtService.sign(payload, { jwtid, secret, expiresIn });
            const expires_at = new Date(Date.now() + ms(expiresIn));
            await this.repo.getRepository(Session).save({ userId: payload.id, jti: jwtid, expires_at });
            if (isMobile) {
                const { code } = await this.repo.getRepository(MobileAuthCode).save({
                    code: randomBytes(32).toString('hex'),
                    access_token,
                    expires_at
                });
                return { access_token, code };
            }
            return { access_token };
        }
        catch (error) {
            throw error;
        }
    }
    async callback(req) {
        try {
            const code = req.query.code;
            const state = req.query.state;
            if (!code || !state)
                throw new HttpException('Missing code or state', HttpStatus.BAD_REQUEST);
            const oauthState = this.getCookie(req, 'oauth_state');
            if (!oauthState || state !== oauthState)
                throw new HttpException('Invalid OAuth state', HttpStatus.BAD_REQUEST);
            const { clientId, redirectUrl, clientSecret } = this.config.getOrThrow('oauth');
            const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                    redirect_uri: redirectUrl,
                    grant_type: 'authorization_code',
                }),
            });
            const token = await response.json();
            if (!response.ok)
                throw new HttpException('Failed to exchange authorization code', HttpStatus.BAD_REQUEST);
            if (!token.id_token)
                throw new HttpException('Google did not return an ID token', HttpStatus.BAD_REQUEST);
            const googleClient = new OAuth2Client(clientId);
            const ticket = await googleClient.verifyIdToken({
                idToken: token.id_token,
                audience: clientId
            });
            const payload = ticket.getPayload();
            if (!payload)
                throw new HttpException('Invalid Google identity', HttpStatus.BAD_REQUEST);
            if (!payload.email || payload.email_verified !== true) {
                throw new HttpException('Google email is not verified', HttpStatus.BAD_REQUEST);
            }
            const user = await this.getUser(payload.email);
            const { access_token } = await this.generateToken(user);
            return { access_token, user };
        }
        catch (error) {
            const name = error?.__name ?? 'callback';
            this.LOGGER.error({
                name,
                message: error instanceof Error ? error.stack : error
            });
            throw error;
        }
    }
    async googleMobileLogin(idToken) {
        try {
            const { clientId } = this.config.getOrThrow('oauth');
            const googleClient = new OAuth2Client(clientId);
            const ticket = await googleClient.verifyIdToken({ idToken, audience: clientId });
            const payload = ticket.getPayload();
            if (!payload)
                throw new HttpException('Invalid Google identity', HttpStatus.UNAUTHORIZED);
            if (!payload.sub)
                throw new HttpException('Invalid Google identity', HttpStatus.UNAUTHORIZED);
            if (!payload.email)
                throw new HttpException('Google account has no email', HttpStatus.UNAUTHORIZED);
            if (payload.email_verified !== true)
                throw new HttpException('Google email is not verified', HttpStatus.UNAUTHORIZED);
            const user = await this.getUser(payload.email);
            const { access_token, code } = await this.generateToken(user, true);
            return { access_token, code };
        }
        catch (error) {
            const name = error?.__name ?? 'mobile-login';
            this.LOGGER.error({
                name,
                message: error instanceof Error ? error.stack : error
            });
            throw error;
        }
    }
    async exchange(code) {
        try {
            const { clientId } = this.config.getOrThrow('oauth');
            if (!clientId)
                throw new HttpException('Invalid Google identity', HttpStatus.UNAUTHORIZED);
            const data = await this.repo.findOne(MobileAuthCode, { where: { code } }, true);
            if (!data || !data?.access_token)
                throw new HttpException('Invalid identity user', HttpStatus.UNAUTHORIZED);
            return { access_token: data.access_token };
        }
        catch (error) {
            this.LOGGER.error({
                name: 'exchange',
                message: error instanceof Error ? error.stack : error
            });
            throw error;
        }
    }
    async me(user) {
        try {
            const data = await this.repo.getRepository(User).findOne({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                },
                where: { email: user.email, role: 'admin' }
            });
            if (!data)
                throw new HttpException('User not verified', HttpStatus.UNAUTHORIZED);
            return { success: true, result: data };
        }
        catch (error) {
            throw error;
        }
    }
    async logout(user) {
        try {
            if (!user?.jti)
                throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
            const repo = this.repo.getRepository(Session);
            const session = await repo.findOneBy({ jti: user.jti });
            if (session && !session.revoked_at) {
                session.revoked_at = new Date();
                await repo.save(session);
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        RepoService,
        JwtService,
        LoggerService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map