import { AiService } from './ai.service.js';
import { SendMessageDTO } from './dto/send-message.dto.js';
export declare class AiController {
    private readonly service;
    constructor(service: AiService);
    create(): Promise<import("./entities/ai.entity.js").SalesAI | import("./entities/ai.entity.js").SalesAI[]>;
    findOne(id: string): Promise<import("./entities/ai.entity.js").SalesAI[]>;
    addMessage(conversation_id: string, dto: SendMessageDTO): Promise<{
        conversation_id: string;
        interaction_id: string;
        user_message: import("./entities/message.entity.js").SalesAIMessage | import("./entities/message.entity.js").SalesAIMessage[];
        model_message: null;
        next_action: {
            type: string;
            data: any;
        };
    } | {
        conversation_id: string;
        interaction_id: string;
        user_message: import("./entities/message.entity.js").SalesAIMessage | import("./entities/message.entity.js").SalesAIMessage[];
        model_message: import("./entities/message.entity.js").SalesAIMessage | import("./entities/message.entity.js").SalesAIMessage[];
        next_action?: undefined;
    }>;
    getMessages(conversation_id: string): Promise<import("./entities/message.entity.js").SalesAIMessage[]>;
}
