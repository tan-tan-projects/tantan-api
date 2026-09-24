import { User } from "../../users/entities/user.entity.js";
import { Resource } from "../../resources/entities/resource.entity.js";
import { Session } from "../../sessions/entities/session.entity.js";
import { CorsOrigin } from "../cors/entities/cors.entity.js";
import { Portfolio } from "../../portfolios/entities/portfolio.entity.js";
import { Monitoring } from "../monitoring/entities/monitoring.entity.js";
import { SalesAI } from "../../sales/ai/entities/ai.entity.js";
import { SalesAIMessage } from "../../sales/ai/entities/message.entity.js";
import { ProjectRequest } from "../../sales/project-requests/entities/project-request.entity.js";
import { SecurityRule } from "../security/entity/security-rule.entity.js";
import { MobileAuthCode } from "../../sessions/entities/mobile-auth-code.entity.js";
import { IpGeolocation } from "../monitoring/entities/ip-geolocation.entity.js";
export default () => {
    const databaseDefault = {
        type: 'google-sheets',
        credentials: {
            clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        },
        synchronize: String(process.env.GOOGLE_SHEETS_DB_SYNC) === 'true',
    };
    const coreEntities = [User, Resource, Session, MobileAuthCode, IpGeolocation, SecurityRule, Portfolio, SalesAI];
    const appEntities = [CorsOrigin, Monitoring, SalesAIMessage, ProjectRequest];
    return {
        app: {
            env: process.env.APP_ENV,
            port: process.env.PORT || process.env.APP_PORT,
            name: process.env.APP_NAME
        },
        jwt: {
            secret: process.env.JWT_KEY,
            expiresIn: process.env.JWT_EXPIRES_IN
        },
        cors: process.env.APP_CORS,
        database: {
            core: {
                name: 'core',
                ...databaseDefault,
                spreadsheetId: process.env.GOOGLE_SHEETS_CORE_SHEET_ID,
                entities: coreEntities,
            },
            app: {
                name: 'app',
                ...databaseDefault,
                spreadsheetId: process.env.GOOGLE_SHEETS_APP_SHEET_ID,
                entities: appEntities,
            }
        },
        oauth: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URI
        },
        gemini: {
            apiKey: process.env.AI_API_KEY,
            model: process.env.AI_MODEL
        },
        cloudinary: {
            name: process.env.CLOUDINARY_CLOUD_NAME,
            key: process.env.CLOUDINARY_API_KEY,
            secret: process.env.CLOUDINARY_API_SECRET
        }
    };
};
//# sourceMappingURL=config.service.js.map