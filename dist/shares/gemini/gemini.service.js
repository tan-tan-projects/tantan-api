var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils/utils.service.js';
import { LoggerService } from '../../core/logger/logger.service.js';
let GeminiService = class GeminiService {
    config;
    utils;
    client;
    model;
    AI_SALES_SYSTEM_PROMPT;
    SEARCH_PORTFOLIOS_TOOL;
    PROJECT_REQUIREMENTS_SCHEMA;
    PROJECT_CONFIRMATION_SCHEMA;
    constructor(config, logger) {
        this.config = config;
        this.utils = new UtilsService(logger);
        const { apiKey, model } = this.config.getOrThrow('gemini');
        this.client = new GoogleGenAI({ apiKey });
        this.model = model;
        this.AI_SALES_SYSTEM_PROMPT = this.utils.helperAI('prompt');
        this.SEARCH_PORTFOLIOS_TOOL = this.utils.helperAI('search');
        this.PROJECT_REQUIREMENTS_SCHEMA = this.utils.helperAI('schema_requerements');
        this.PROJECT_CONFIRMATION_SCHEMA = this.utils.helperAI('schema_confirmation');
    }
    async generate(input, previousInteractionId) {
        const interaction = await this.client.interactions.create({
            model: this.model,
            input,
            system_instruction: this.AI_SALES_SYSTEM_PROMPT,
            tools: [this.SEARCH_PORTFOLIOS_TOOL],
            ...(previousInteractionId
                ? { previous_interaction_id: previousInteractionId }
                : {}),
            service_tier: 'priority'
        });
        return interaction;
    }
    async continueWithFunctionResult(interactionId, name, callId, result) {
        return await this.client.interactions.create({
            model: this.model,
            previous_interaction_id: interactionId,
            system_instruction: this.AI_SALES_SYSTEM_PROMPT,
            tools: [this.SEARCH_PORTFOLIOS_TOOL],
            input: [
                {
                    type: 'function_result',
                    name,
                    call_id: callId,
                    result: [
                        {
                            type: 'text',
                            text: JSON.stringify(result),
                        },
                    ],
                },
            ],
        });
    }
    async extractProjectRequirements(previousInteractionId) {
        const interaction = await this.client.interactions.create({
            model: this.model,
            previous_interaction_id: previousInteractionId,
            system_instruction: this.PROJECT_REQUIREMENTS_SCHEMA.system_instruction,
            input: this.PROJECT_REQUIREMENTS_SCHEMA.input,
            response_format: {
                type: 'text',
                mime_type: 'application/json',
                schema: this.PROJECT_REQUIREMENTS_SCHEMA.schema,
            },
        });
        const output = interaction.output_text?.trim();
        if (!output)
            throw new Error('Gemini returned empty project requirements');
        return {
            interaction,
            data: JSON.parse(output),
        };
    }
    async detectProjectConfirmation(previousInteractionId, content) {
        const interaction = await this.client.interactions.create({
            model: this.model,
            previous_interaction_id: previousInteractionId,
            system_instruction: this.PROJECT_CONFIRMATION_SCHEMA.system_instruction,
            input: content,
            response_format: {
                type: 'text',
                mime_type: 'application/json',
                schema: this.PROJECT_CONFIRMATION_SCHEMA.schema,
            },
        });
        const output = interaction.output_text?.trim();
        if (!output)
            throw new Error('Gemini returned empty confirmation result');
        return {
            interaction,
            confirmed: JSON.parse(output).confirmed === true,
        };
    }
};
GeminiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService, LoggerService])
], GeminiService);
export { GeminiService };
//# sourceMappingURL=gemini.service.js.map