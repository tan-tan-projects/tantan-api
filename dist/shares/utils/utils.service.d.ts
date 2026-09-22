import { LoggerService } from '../../core/logger/logger.service.js';
import { Request, Response } from 'express';
export declare class UtilsService {
    private LOGGER;
    constructor(logger: LoggerService);
    log(context: string, req: Request, res: Response, startedAt: number, flag: 'log' | 'error'): void;
    sanitize(value: unknown): unknown;
    helperAI(key: string): string | {
        readonly type: "function";
        readonly name: "search_portfolios";
        readonly description: "\n            Search the available software and digital project portfolio.\n\n            MUST use this function when the customer asks about:\n            - available applications\n            - available software\n            - available digital solutions\n            - application lists\n            - project lists\n            - portfolio lists\n            - previous projects\n            - project examples\n            - projects related to a specific type of solution\n            - technologies or capabilities demonstrated by previous projects\n\n            Examples:\n            - \"berikan list aplikasi yang tersedia\"\n            - \"ada aplikasi apa saja?\"\n            - \"tampilkan portfolio\"\n            - \"project apa saja yang pernah dibuat?\"\n            - \"contoh aplikasi yang pernah dibuat\"\n            - \"list available applications\"\n            - \"show me your projects\"\n\n            Do not answer portfolio-related questions from general knowledge.\n\n            Only use information returned by this function when discussing portfolio\n            projects, applications, software, technologies, features, or capabilities.\n\n            Do not invent or estimate projects, clients, technologies, features, results,\n            prices, timelines, or capabilities that are not returned by this function.\n\n            If the customer asks for all available projects or applications, search\n            without restricting the query to a specific project type.\n            ";
        readonly parameters: {
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly type: "string";
                    readonly description: "\n                        A concise search query describing what portfolio information\n                        the customer is looking for.\n\n                        For a request for all available projects or applications, use a\n                        generic query such as \"all projects\".\n\n                        Examples:\n                        - \"all projects\"\n                        - \"website\"\n                        - \"e-commerce\"\n                        - \"mobile application\"\n                        - \"project using Vue\"\n                        - \"inventory system\"\n                        ";
                };
            };
            readonly required: readonly ["query"];
        };
    } | {
        schema: {
            readonly type: "object";
            readonly properties: {
                readonly business: {
                    readonly type: "string";
                    readonly description: "Jenis atau bidang bisnis yang secara eksplisit disebutkan customer.";
                };
                readonly goal: {
                    readonly type: "string";
                    readonly description: "Tujuan utama project yang secara eksplisit disebutkan customer.";
                };
                readonly target_audience: {
                    readonly type: "string";
                    readonly description: "Target pengguna atau audiens yang secara eksplisit disebutkan customer.";
                };
                readonly requirements: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "Requirement tambahan yang secara eksplisit disebutkan customer. Jangan membuat asumsi atau menambahkan fitur.";
                };
            };
            readonly required: readonly ["business", "goal", "target_audience", "requirements"];
        };
        system_instruction: string;
        input: string;
    } | {
        schema: {
            readonly type: "object";
            readonly properties: {
                readonly confirmed: {
                    readonly type: "boolean";
                    readonly description: string;
                };
            };
            readonly required: readonly ["confirmed"];
        };
        system_instruction: string;
    };
    private systemPromptAI;
    private searchAI;
    private schemaRequerementsIA;
    private schemaConfirmationIA;
}
