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
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Public } from './core/jwt/guard/auth.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');
let AppController = class AppController {
    service;
    constructor(service) {
        this.service = service;
    }
    getHome(res) {
        const { productName, version, author } = pkg;
        const emailMatch = typeof author === 'string' ? author.match(/<(.+?)>/) : null;
        const email = emailMatch?.[1] || '';
        const authorName = (typeof author === 'string' ? author : '')
            .replace(/<.*?>/, '')
            .trim()
            .replace(/^tan-tan/i, 'tantan')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        const logo = 'https://res.cloudinary.com/tantan-projects/image/upload/f_auto,q_auto,w_128/v1789717178/assets/images/s32srqcxsdkpyj5lofv6.png';
        const background = 'https://res.cloudinary.com/tantan-projects/image/upload/f_auto,q_auto,w_1920/v1789716126/assets/images/ljumjxjccbhh6zosw8oo.jpg';
        res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <meta
        name="theme-color"
        content="#080b14"
      >

      <title>${productName} — API Server</title>

      <style>
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          min-height: 100vh;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 24px;

          color: #ffffff;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background: #080b14;
        }

        /* -------------------------------------------------- */
        /* BACKGROUND                                         */
        /* -------------------------------------------------- */

        .background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .background img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          opacity: .62;

          transform: scale(1.04);
        }

        .background::before {
          content: "";

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(4, 7, 16, .55),
              rgba(4, 7, 16, .72)
            );

          z-index: 1;
        }

        .background::after {
          content: "";

          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 42%,
              transparent 0%,
              rgba(3, 6, 14, .55) 70%,
              rgba(3, 6, 14, .88) 100%
            );

          z-index: 2;
        }

        /* -------------------------------------------------- */
        /* DECORATIVE GLOWS                                   */
        /* -------------------------------------------------- */

        .glow {
          position: fixed;

          width: 380px;
          height: 380px;

          border-radius: 50%;

          filter: blur(110px);

          opacity: .12;

          pointer-events: none;
        }

        .glow.one {
          top: -230px;
          left: -180px;

          background: #5148dd;
        }

        .glow.two {
          right: -220px;
          bottom: -240px;

          background: #d73131;
        }

        /* -------------------------------------------------- */
        /* CARD                                               */
        /* -------------------------------------------------- */

        .card {
          position: relative;
          z-index: 3;

          width: 100%;
          max-width: 420px;

          padding: 38px 36px 28px;

          text-align: center;

          border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 22px;

          background:
            rgba(7, 10, 20, .78);

          box-shadow:
            0 28px 70px rgba(0, 0, 0, .55),
            inset 0 1px 0 rgba(255, 255, 255, .035);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* -------------------------------------------------- */
        /* BRAND                                              */
        /* -------------------------------------------------- */

        .brand {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 10px;

          margin-bottom: 28px;
        }

        .brand img {
          display: block;

          width: 54px;
          height: 54px;

          object-fit: contain;
        }

        .brand-name {
          color: #ffffff;

          font-size: 19px;
          font-weight: 700;

          line-height: 1;

          letter-spacing: -.025em;
        }

        /* -------------------------------------------------- */
        /* STATUS                                             */
        /* -------------------------------------------------- */

        .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 18px;

          padding: 7px 12px;

          border: 1px solid rgba(34, 197, 94, .18);
          border-radius: 999px;

          background: rgba(34, 197, 94, .055);

          color: rgba(187, 247, 208, .9);

          font-size: 12px;
          font-weight: 600;
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 10px rgba(34, 197, 94, .8);
        }

        /* -------------------------------------------------- */
        /* CONTENT                                            */
        /* -------------------------------------------------- */

        h1 {
          margin: 0 0 10px;

          color: #ffffff;

          font-size: 29px;
          font-weight: 700;

          line-height: 1.15;

          letter-spacing: -.035em;
        }

        .description {
          margin: 0 auto;

          max-width: 320px;

          color: rgba(255, 255, 255, .52);

          font-size: 14px;
          line-height: 1.7;
        }

        /* -------------------------------------------------- */
        /* DIVIDER                                            */
        /* -------------------------------------------------- */

        .divider {
          width: 100%;
          height: 1px;

          margin: 26px 0 19px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, .09),
              transparent
            );
        }

        /* -------------------------------------------------- */
        /* SECURITY                                           */
        /* -------------------------------------------------- */

        .security {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          color: rgba(255, 255, 255, .35);

          font-size: 11px;
        }

        .security-icon {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 7px rgba(34, 197, 94, .7);
        }

        /* -------------------------------------------------- */
        /* FOOTER                                             */
        /* -------------------------------------------------- */

        .footer {
          position: fixed;

          left: 0;
          right: 0;
          bottom: 16px;

          z-index: 4;

          padding: 0 20px;

          text-align: center;

          color: rgba(255, 255, 255, .32);

          font-size: 11px;
        }

        .footer a {
          color: rgba(255, 255, 255, .55);

          text-decoration: none;
        }

        .footer a:hover {
          color: #ffffff;
        }

        /* -------------------------------------------------- */
        /* MOBILE                                             */
        /* -------------------------------------------------- */

        @media (max-width: 520px) {
          body {
            padding: 20px;
          }

          .card {
            max-width: 100%;

            padding: 32px 24px 25px;

            border-radius: 20px;
          }

          h1 {
            font-size: 27px;
          }

          .brand {
            margin-bottom: 25px;
          }

          .footer {
            bottom: 10px;
          }
        }
      </style>
    </head>

    <body>

      <div class="background">
        <img
          src="${background}"
          alt=""
        >
      </div>

      <div class="glow one"></div>
      <div class="glow two"></div>

      <main class="card">

        <div class="brand">
          <img
            src="${logo}"
            alt="${productName}"
          >

          <div class="brand-name">
            ${productName}
          </div>
        </div>

        <div class="status">
          <span class="status-dot"></span>
          <span>API Online</span>
        </div>

        <h1>
          API Server
        </h1>

        <p class="description">
          The server is running normally and
          ready to process requests.
        </p>

        <div class="divider"></div>

        <div class="security">
          <span class="security-icon"></span>
          <span>Secure API infrastructure</span>
        </div>

      </main>

      <footer class="footer">
        ${email
            ? `<a href="mailto:${email}">${authorName}</a>`
            : `<span>${authorName}</span>`}

        <span> · </span>

        <span>
          © ${new Date().getFullYear()} — All rights reserved
        </span>

        <span> · Version ${version}</span>
      </footer>

    </body>
    </html>
  `);
    }
    getTest() {
        return this.service.getTest();
    }
    getCofig() {
        return this.service.getCofig();
    }
    async geminiTest() {
        return this.service.geminiTest();
    }
};
__decorate([
    Public(),
    Get(),
    __param(0, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHome", null);
__decorate([
    Get('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTest", null);
__decorate([
    Get('cloudiary/get/config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCofig", null);
__decorate([
    Get('gemini'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "geminiTest", null);
AppController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [AppService])
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map