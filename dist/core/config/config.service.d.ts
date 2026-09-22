import { GoogleSheetsDataSourceOptions } from "tantan-typeorm-gs";
declare const _default: () => {
    app: {
        env: string;
        port: string;
        name: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: string;
    database: {
        core: GoogleSheetsDataSourceOptions;
        app: GoogleSheetsDataSourceOptions;
    };
    oauth: {
        clientId: string;
        clientSecret: string;
        redirectUrl: string;
    };
    gemini: {
        apiKey: string;
        model: string;
    };
    cloudinary: {
        name: string;
        key: string;
        secret: string;
    };
};
export default _default;
