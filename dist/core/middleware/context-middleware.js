import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { UAParser } from 'ua-parser-js';
export const requestContextStorage = new AsyncLocalStorage();
export class ContextMiddleware {
    static run(req, res, next) {
        const userAgent = String(req.headers['user-agent'] ?? '');
        const parser = new UAParser(userAgent);
        const device = parser.getDevice();
        const os = parser.getOS();
        const browser = parser.getBrowser();
        const engine = parser.getEngine();
        const deviceType = this.resolveDeviceType(device.type);
        const context = {
            id: randomUUID(),
            req,
            res,
            request: {
                method: req.method,
                url: req.originalUrl || req.url,
                path: req.path,
                ip: req.ip ?? '',
                ips: [...req.ips],
                protocol: req.protocol,
                secure: req.secure,
                host: req.get('host') ?? '',
                origin: req.get('origin') ?? '',
                referer: req.get('referer') ?? '',
                userAgent,
                language: req.get('accept-language') ?? '',
                contentType: req.get('content-type') ?? '',
                contentLength: req.get('content-length') ?? '',
            },
            device: {
                type: deviceType,
                os: os.name ?? '',
                osVersion: os.version ?? '',
                browser: browser.name ?? '',
                browserVersion: browser.version ?? '',
                model: device.model ?? '',
                vendor: device.vendor ?? '',
                isMobile: deviceType === 'mobile',
                isTablet: deviceType === 'tablet',
                isDesktop: deviceType === 'desktop',
            },
            bot: {
                isBot: Boolean(parser.getCPU().architecture === undefined) && this.detectBot(userAgent),
                name: this.detectBotName(userAgent),
                category: this.detectBotCategory(userAgent),
            },
            user: req.user ?? null,
        };
        requestContextStorage.run(context, next);
    }
    static current() {
        return requestContextStorage.getStore();
    }
    static get() {
        return this.current();
    }
    static id() {
        return this.current()?.id ?? '';
    }
    static request() {
        return this.current()?.request;
    }
    static device() {
        return this.current()?.device;
    }
    static bot() {
        return this.current()?.bot;
    }
    static user() {
        return this.current()?.user ?? null;
    }
    static resolveDeviceType(type) {
        switch (type) {
            case 'desktop':
            case 'mobile':
            case 'tablet':
            case 'smarttv':
            case 'wearable':
            case 'embedded':
            case 'console':
                return type;
            default: return 'unknown';
        }
    }
    static detectBot(userAgent) {
        return /\b(bot|crawler|spider|slurp|scraper|curl|wget)\b/i.test(userAgent);
    }
    static detectBotName(userAgent) {
        const patterns = [
            [/\bgooglebot\b/i, 'Googlebot'],
            [/\bbingbot\b/i, 'Bingbot'],
            [/\byandexbot\b/i, 'YandexBot'],
            [/\bduckduckbot\b/i, 'DuckDuckBot'],
            [/\bbaiduspider\b/i, 'Baiduspider'],
            [/\bfacebookexternalhit\b/i, 'Facebook'],
            [/\bfacebot\b/i, 'Facebot'],
            [/\bslurp\b/i, 'Yahoo'],
            [/\bcurl\b/i, 'curl'],
            [/\bwget\b/i, 'Wget'],
        ];
        for (const [pattern, name] of patterns) {
            if (pattern.test(userAgent))
                return name;
        }
        return '';
    }
    static detectBotCategory(userAgent) {
        if (!this.detectBot(userAgent)) {
            return '';
        }
        if (/\b(curl|wget)\b/i.test(userAgent)) {
            return 'http-client';
        }
        if (/\b(googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp)\b/i.test(userAgent)) {
            return 'search-engine';
        }
        if (/\b(spider|crawler|scraper)\b/i.test(userAgent)) {
            return 'crawler';
        }
        return 'unknown';
    }
}
//# sourceMappingURL=context-middleware.js.map