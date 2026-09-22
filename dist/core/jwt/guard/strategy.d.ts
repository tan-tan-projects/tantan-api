import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "./payload.js";
import { RepoService } from "../../../shares/repo/repo.service.js";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    readonly repo: RepoService;
    constructor(config: ConfigService, repo: RepoService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
