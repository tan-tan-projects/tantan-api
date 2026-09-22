import { RepoService } from '../../shares/repo/repo.service.js';
import { SalesAI } from './entities/ai.entity.js';
import { SalesAIMessage } from './entities/message.entity.js';
import { GeminiService } from '../../shares/gemini/gemini.service.js';
import { ToolsAIService } from '../../shares/gemini/tools.service.js';
export declare class AiService {
    readonly repo: RepoService;
    readonly gemini: GeminiService;
    private readonly tools;
    constructor(repo: RepoService, gemini: GeminiService, tools: ToolsAIService);
    create(): Promise<SalesAI | SalesAI[]>;
    findOne(id: string): Promise<SalesAI[]>;
    addMessage(conversation_id: string, role: 'user' | 'model', content: string): Promise<SalesAIMessage | SalesAIMessage[]>;
    sendMessage(conversation_id: string, content: string): Promise<{
        conversation_id: string;
        interaction_id: string;
        user_message: SalesAIMessage | SalesAIMessage[];
        model_message: null;
        next_action: {
            type: string;
            data: any;
        };
    } | {
        conversation_id: string;
        interaction_id: string;
        user_message: SalesAIMessage | SalesAIMessage[];
        model_message: SalesAIMessage | SalesAIMessage[];
        next_action?: undefined;
    }>;
    getMessages(conversation_id: string): Promise<SalesAIMessage[]>;
}
