var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { RepoService } from '../../shares/repo/repo.service.js';
import { SalesAI } from './entities/ai.entity.js';
import { SalesAIMessage } from './entities/message.entity.js';
import { GeminiService } from '../../shares/gemini/gemini.service.js';
import { ToolsAIService } from '../../shares/gemini/tools.service.js';
let AiService = class AiService {
    repo;
    gemini;
    tools;
    constructor(repo, gemini, tools) {
        this.repo = repo;
        this.gemini = gemini;
        this.tools = tools;
    }
    create() {
        return this.repo.save(SalesAI, {});
    }
    findOne(id) {
        return this.repo.findBy(SalesAI, { id });
    }
    addMessage(conversation_id, role, content) {
        return this.repo.save(SalesAIMessage, { conversation_id, role, content });
    }
    async sendMessage(conversation_id, content) {
        const conversation = await this.repo.findOneBy(SalesAI, { id: conversation_id });
        const userMessage = await this.repo.save(SalesAIMessage, { conversation_id, role: 'user', content });
        let response = await this.gemini.generate(content, conversation.gemini_interaction_id ?? undefined);
        const MAX_FUNCTION_CALLS = 5;
        let functionCallCount = 0;
        while (true) {
            const functionCalls = response.steps.filter((step) => step.type === 'function_call');
            if (!functionCalls.length)
                break;
            for (const functionCall of functionCalls) {
                functionCallCount++;
                if (functionCallCount > MAX_FUNCTION_CALLS)
                    throw new Error('AI Sales function call limit exceeded');
                let result;
                try {
                    result = await this.tools.execute(functionCall.name, functionCall.arguments);
                }
                catch (error) {
                    result = { error: error instanceof Error ? error.message : 'Function execution failed' };
                }
                response = await this.gemini.continueWithFunctionResult(response.id, functionCall.name, functionCall.id, result);
            }
        }
        const confirmation = await this.gemini.detectProjectConfirmation(response.id, content);
        if (confirmation.confirmed) {
            const requirements = await this.gemini.extractProjectRequirements(response.id);
            await this.repo.update(SalesAI, { id: conversation_id }, { gemini_interaction_id: requirements.interaction.id });
            return {
                conversation_id,
                interaction_id: requirements.interaction.id,
                user_message: userMessage,
                model_message: null,
                next_action: {
                    type: 'project_request_form',
                    data: requirements.data,
                },
            };
        }
        const output = response.output_text?.trim() ?? '';
        if (!output)
            throw new Error('Gemini returned an empty response');
        const modelMessage = await this.repo.save(SalesAIMessage, { conversation_id, role: 'model', content: output });
        await this.repo.update(SalesAI, { id: conversation_id }, { gemini_interaction_id: response.id });
        return {
            conversation_id,
            interaction_id: response.id,
            user_message: userMessage,
            model_message: modelMessage,
        };
    }
    getMessages(conversation_id) {
        return this.repo.find(SalesAIMessage, { where: { conversation_id }, order: { created_at: 'ASC' } });
    }
};
AiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService,
        GeminiService,
        ToolsAIService])
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map