var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from '../core/jwt/guard/auth.js';
import { randomBytes } from 'crypto';
import { CUser } from '../core/jwt/decorator/user.js';
let AuthController = class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    login(req, res) {
        try {
            const redirect = req.query.redirect;
            if (!redirect) {
                res.statusCode = 400;
                return {
                    success: false,
                    message: 'Missing redirect',
                };
            }
            const state = randomBytes(32).toString('hex');
            const url = this.service.login(state);
            res.cookie('oauth_state', state, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            res.cookie('oauth_redirect', redirect, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            return res.redirect(302, url);
        }
        catch (error) {
            res.statusCode = 401;
            return {
                success: false,
                message: 'Login failed',
            };
        }
    }
    async callback(req, res) {
        const redirect = this.service.getCookie(req, 'oauth_redirect', true);
        if (!redirect) {
            res.statusCode = 400;
            return {
                success: false,
                message: 'Missing redirect',
            };
        }
        try {
            const { access_token } = await this.service.callback(req);
            const isMobile = redirect.startsWith('tantan-dashboard://auth/callback');
            if (isMobile) {
                const code = await this.service.createMobileAuthCode(access_token);
                res.clearCookie('oauth_state', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });
                res.clearCookie('oauth_redirect', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });
                return res.redirect(302, `tantan-dashboard://auth/callback?code=${encodeURIComponent(code)}`);
            }
            res.clearCookie('oauth_state', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            res.clearCookie('oauth_redirect', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            res.cookie('authorization', access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
            });
            const url = new URL(redirect);
            if (url.hash) {
                const [path, query] = url.hash.split('?');
                const params = new URLSearchParams(query);
                params.delete('error');
                params.set('success', 'Login successful');
                url.hash = `${path}?${params.toString()}`;
            }
            else {
                url.searchParams.delete('error');
                url.searchParams.set('success', 'Login successful');
            }
            return res.redirect(302, url.toString());
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Authentication failed';
            const url = new URL(redirect);
            if (url.hash) {
                const [path, query] = url.hash.split('?');
                const params = new URLSearchParams(query);
                params.set('error', message);
                url.hash = `${path}?${params.toString()}`;
            }
            else {
                url.searchParams.set('error', message);
            }
            return res.redirect(302, url.toString());
        }
    }
    async exchange(code, res) {
        if (!code) {
            res.statusCode = 400;
            return {
                success: false,
                message: 'Missing code',
            };
        }
        const accessToken = await this.service.consumeMobileAuthCode(code);
        if (!accessToken) {
            res.statusCode = 401;
            return {
                success: false,
                message: 'Invalid or expired code',
            };
        }
        res.cookie('authorization', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return {
            success: true,
        };
    }
    async googleMobile(idToken, res) {
        if (!idToken) {
            res.statusCode = 400;
            return {
                success: false,
                message: 'Missing ID token',
            };
        }
        const { access_token } = await this.service.googleMobileLogin(idToken);
        res.cookie('authorization', access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return {
            success: true,
        };
    }
    me(user) {
        return this.service.me(user);
    }
    async logout(user, res) {
        const success = await this.service.logout(user);
        res.clearCookie('authorization', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        });
        res.statusCode = 200;
        return { success, message: 'Logout successful' };
    }
};
__decorate([
    Public(),
    Get('login'),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    Public(),
    Get('callback'),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback", null);
__decorate([
    Public(),
    Post('exchange'),
    __param(0, Body('code')),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "exchange", null);
__decorate([
    Public(),
    Post('google/mobile'),
    __param(0, Body('idToken')),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleMobile", null);
__decorate([
    Get('me'),
    __param(0, CUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    Get('logout'),
    __param(0, CUser()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map