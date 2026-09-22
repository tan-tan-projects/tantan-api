import { AppService } from './app.service.js';
import type { Response } from 'express';
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    getHome(res: Response): void;
    getTest(): import("tantan-typeorm-gs").GoogleSheetsDataSourceOptions[];
    getCofig(): typeof import("cloudinary").v2;
    geminiTest(): Promise<{
        success: boolean;
        response: Omit<{
            agent?: ((string & {}) | "deep-research-pro-preview-12-2025" | "deep-research-preview-04-2026" | "deep-research-max-preview-04-2026" | "antigravity-preview-05-2026") | undefined;
            agent_config?: {
                max_total_tokens?: string | undefined;
                model?: string | undefined;
                type: "antigravity";
            } | {
                find_request?: {
                    description?: string | undefined;
                    finding_id?: string | undefined;
                    mode?: ((string & {}) | "scan" | "verify") | undefined;
                    source_files?: Array<{
                        content?: string | undefined;
                        path?: string | undefined;
                    }> | undefined;
                } | undefined;
                fix_request?: {
                    description?: string | undefined;
                    finding_id?: string | undefined;
                    source_files?: Array<{
                        content?: string | undefined;
                        path?: string | undefined;
                    }> | undefined;
                } | undefined;
                model?: string | undefined;
                session_config?: {
                    max_rounds?: number | undefined;
                } | undefined;
                session_id?: string | undefined;
                type: "code-mender";
            } | {
                collaborative_planning?: boolean | undefined;
                enable_bigquery_tool?: boolean | undefined;
                thinking_summaries?: ((string & {}) | "auto" | "none") | undefined;
                type: "deep-research";
                visualization?: ((string & {}) | "auto" | "off") | undefined;
            } | {
                [additionalProperties: string]: unknown;
                type: "dynamic";
            } | undefined;
            created?: string | undefined;
            environment?: {
                env?: {
                    [k: string]: {
                        credential?: string | undefined;
                        value?: string | undefined;
                    };
                } | string | undefined;
                environment_id?: string | undefined;
                network?: ({
                    allowlist?: Array<{
                        credential?: string | undefined;
                        domain: string;
                        transform?: Array<{
                            [k: string]: string;
                        }> | {
                            [k: string]: string;
                        } | undefined;
                    }> | undefined;
                } | "disabled") | "disabled" | undefined;
                sources?: Array<{
                    content?: string | undefined;
                    encoding?: string | undefined;
                    source?: string | undefined;
                    target?: string | undefined;
                    type?: ((string & {}) | "gcs" | "inline" | "repository" | "skill_registry") | undefined;
                }> | undefined;
                type: "remote";
            } | string | undefined;
            environment_id?: string | undefined;
            errors?: Array<{
                code?: string | undefined;
                message?: string | undefined;
            }> | undefined;
            generation_config?: {
                image_config?: {
                    aspect_ratio?: ((string & {}) | "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "1:8" | "8:1" | "1:4" | "4:1") | undefined;
                    image_size?: ((string & {}) | "1K" | "2K" | "4K" | "512") | undefined;
                } | undefined;
                max_output_tokens?: number | undefined;
                seed?: number | undefined;
                speech_config?: {
                    speakers?: Array<{
                        language?: string | undefined;
                        speaker?: string | undefined;
                        voice?: string | undefined;
                    }> | undefined;
                } | Array<{
                    language?: string | undefined;
                    speaker?: string | undefined;
                    voice?: string | undefined;
                }> | undefined;
                stop_sequences?: Array<string> | undefined;
                thinking_level?: ((string & {}) | "low" | "medium" | "high" | "minimal") | undefined;
                thinking_summaries?: ((string & {}) | "auto" | "none") | undefined;
                tool_choice?: {
                    allowed_tools?: {
                        mode?: ((string & {}) | "auto" | "none" | "any" | "validated") | undefined;
                        tools?: Array<string> | undefined;
                    } | undefined;
                } | ((string & {}) | "auto" | "none" | "any" | "validated") | undefined;
                transcription_config?: {
                    adaptation_phrases?: Array<string> | undefined;
                    custom_vocabulary?: Array<string> | undefined;
                    diarization_mode?: string | undefined;
                    language_codes?: Array<string> | undefined;
                    mode?: ({
                        type: "smart";
                    } | {
                        diarization_mode?: string | undefined;
                        timestamp_granularities?: Array<string> | undefined;
                        type: "verbatim";
                    }) | ((string & {}) | "verbatim" | "smart") | undefined;
                    timestamp_granularities?: Array<string> | undefined;
                } | undefined;
                video_config?: {
                    task?: ((string & {}) | "text_to_video" | "image_to_video" | "reference_to_video" | "edit" | "extend") | undefined;
                } | undefined;
            } | undefined;
            id: string;
            input?: (string | ({
                channels?: number | undefined;
                data?: string | undefined;
                mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                sample_rate?: number | undefined;
                type: "audio";
                uri?: string | undefined;
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                type: "document";
                uri?: string | undefined;
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "image";
                uri?: string | undefined;
            } | {
                annotations?: Array<{
                    custom_metadata?: {
                        [k: string]: any;
                    } | undefined;
                    document_uri?: string | undefined;
                    end_index?: number | undefined;
                    file_name?: string | undefined;
                    media_id?: string | undefined;
                    page_number?: number | undefined;
                    source?: string | undefined;
                    start_index?: number | undefined;
                    type: "file_citation";
                } | {
                    end_index?: number | undefined;
                    name?: string | undefined;
                    place_id?: string | undefined;
                    review_snippets?: Array<{
                        review_id?: string | undefined;
                        title?: string | undefined;
                        url?: string | undefined;
                    }> | undefined;
                    start_index?: number | undefined;
                    type: "place_citation";
                    url?: string | undefined;
                } | {
                    end_index?: number | undefined;
                    start_index?: number | undefined;
                    title?: string | undefined;
                    type: "url_citation";
                    url?: string | undefined;
                } | {
                    end_index?: number | undefined;
                    end_offset?: string | undefined;
                    speaker?: string | undefined;
                    start_index?: number | undefined;
                    start_offset?: string | undefined;
                    text?: string | undefined;
                    type: "word_info";
                }> | undefined;
                text: string;
                type: "text";
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                name?: string | undefined;
                processing?: {
                    end_offset?: string | undefined;
                    fps?: number | undefined;
                    start_offset?: string | undefined;
                    type: "static";
                } | ((string & {}) | "static" | "agentic") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "video";
                uri?: string | undefined;
            }) | ({
                arguments: {
                    code?: string | undefined;
                    language?: "python" | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "code_execution_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: string;
                signature?: string | undefined;
                type: "code_execution_result";
            } | {
                id: string;
                signature?: string | undefined;
                type: "file_search_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "file_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                type: "function_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                type: "function_result";
            } | {
                arguments?: {
                    queries?: Array<string> | undefined;
                } | undefined;
                id: string;
                signature?: string | undefined;
                type: "google_maps_call";
            } | {
                call_id: string;
                result: Array<{
                    places?: Array<{
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        url?: string | undefined;
                    }> | undefined;
                    widget_context_token?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_maps_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                search_type?: ((string & {}) | "web_search" | "image_search" | "enterprise_web_search") | undefined;
                signature?: string | undefined;
                type: "google_search_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    search_suggestions?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                server_name: string;
                type: "mcp_server_tool_call";
            } | {
                call_id: string;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                server_name?: string | undefined;
                type: "mcp_server_tool_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                error?: {
                    code?: number | undefined;
                    details?: Array<{
                        [k: string]: any;
                    }> | undefined;
                    message?: string | undefined;
                } | undefined;
                type: "model_output";
            } | {
                id: string;
                signature?: string | undefined;
                type: "processing_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "processing_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                retrieval_type?: ((string & {}) | "vertex_ai_search" | "rag_store" | "exa_ai_search" | "parallel_ai_search") | undefined;
                signature?: string | undefined;
                type: "retrieval_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                signature?: string | undefined;
                type: "retrieval_result";
            } | {
                signature?: string | undefined;
                summary?: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | undefined;
                type: "thought";
            } | {
                arguments: {
                    urls?: Array<string> | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "url_context_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    status?: ("error" | (string & {}) | "success" | "paywall" | "unsafe") | undefined;
                    url?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "url_context_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                type: "user_input";
            })[] | ({
                channels?: number | undefined;
                data?: string | undefined;
                mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                sample_rate?: number | undefined;
                type: "audio";
                uri?: string | undefined;
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                type: "document";
                uri?: string | undefined;
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "image";
                uri?: string | undefined;
            } | {
                annotations?: Array<{
                    custom_metadata?: {
                        [k: string]: any;
                    } | undefined;
                    document_uri?: string | undefined;
                    end_index?: number | undefined;
                    file_name?: string | undefined;
                    media_id?: string | undefined;
                    page_number?: number | undefined;
                    source?: string | undefined;
                    start_index?: number | undefined;
                    type: "file_citation";
                } | {
                    end_index?: number | undefined;
                    name?: string | undefined;
                    place_id?: string | undefined;
                    review_snippets?: Array<{
                        review_id?: string | undefined;
                        title?: string | undefined;
                        url?: string | undefined;
                    }> | undefined;
                    start_index?: number | undefined;
                    type: "place_citation";
                    url?: string | undefined;
                } | {
                    end_index?: number | undefined;
                    start_index?: number | undefined;
                    title?: string | undefined;
                    type: "url_citation";
                    url?: string | undefined;
                } | {
                    end_index?: number | undefined;
                    end_offset?: string | undefined;
                    speaker?: string | undefined;
                    start_index?: number | undefined;
                    start_offset?: string | undefined;
                    text?: string | undefined;
                    type: "word_info";
                }> | undefined;
                text: string;
                type: "text";
            } | {
                data?: string | undefined;
                mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                name?: string | undefined;
                processing?: {
                    end_offset?: string | undefined;
                    fps?: number | undefined;
                    start_offset?: string | undefined;
                    type: "static";
                } | ((string & {}) | "static" | "agentic") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "video";
                uri?: string | undefined;
            })[]) | undefined;
            labels?: {
                [k: string]: string;
            } | undefined;
            model?: ((string & {}) | "gemini-2.5-flash" | "gemini-2.5-pro" | "gemma-4-26b-a4b-it" | "gemma-4-31b-it" | "gemini-flash-latest" | "gemini-flash-lite-latest" | "gemini-pro-latest" | "gemini-2.5-flash-lite" | "gemini-2.5-flash-image" | "gemini-3-flash-preview" | "gemini-3.1-pro-preview" | "gemini-3.1-pro-preview-customtools" | "gemini-3.1-flash-lite" | "gemini-3-pro-image" | "nano-banana-pro-preview" | "gemini-3.1-flash-image" | "gemini-3.5-flash" | "gemini-3.6-flash" | "gemini-3.7-flash" | "gemini-3.8-flash" | "lyria-3-clip-preview" | "lyria-3-pro-preview" | "gemini-robotics-er-1.6-preview" | "gemini-robotics-er-2-preview") | undefined;
            output_audio?: {
                channels?: number | undefined;
                data?: string | undefined;
                mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                sample_rate?: number | undefined;
                type: "audio";
                uri?: string | undefined;
            } | undefined;
            output_image?: {
                data?: string | undefined;
                mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "image";
                uri?: string | undefined;
            } | undefined;
            output_text?: string | undefined;
            output_video?: {
                data?: string | undefined;
                mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                name?: string | undefined;
                processing?: {
                    end_offset?: string | undefined;
                    fps?: number | undefined;
                    start_offset?: string | undefined;
                    type: "static";
                } | ((string & {}) | "static" | "agentic") | undefined;
                resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                type: "video";
                uri?: string | undefined;
            } | undefined;
            previous_interaction_id?: string | undefined;
            response_format?: ({
                bit_rate?: number | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/l16" | "audio/alaw" | "audio/mulaw" | "audio/ogg_opus") | undefined;
                sample_rate?: number | undefined;
                type: "audio";
            } | {
                aspect_ratio?: ((string & {}) | "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "1:8" | "8:1" | "1:4" | "4:1") | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                image_size?: ((string & {}) | "1K" | "2K" | "4K" | "512") | undefined;
                mime_type?: "image/jpeg" | undefined;
                type: "image";
            } | {
                mime_type?: ((string & {}) | "application/json" | "text/plain") | undefined;
                schema?: {
                    [k: string]: any;
                } | undefined;
                type: "text";
            } | {
                aspect_ratio?: ((string & {}) | "9:16" | "16:9") | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                duration?: string | undefined;
                gcs_uri?: string | undefined;
                resolution?: ((string & {}) | "360p" | "720p" | "1080p" | "4k") | undefined;
                type: "video";
            } | {
                [k: string]: any;
            }) | Array<{
                bit_rate?: number | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/l16" | "audio/alaw" | "audio/mulaw" | "audio/ogg_opus") | undefined;
                sample_rate?: number | undefined;
                type: "audio";
            } | {
                aspect_ratio?: ((string & {}) | "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "1:8" | "8:1" | "1:4" | "4:1") | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                image_size?: ((string & {}) | "1K" | "2K" | "4K" | "512") | undefined;
                mime_type?: "image/jpeg" | undefined;
                type: "image";
            } | {
                mime_type?: ((string & {}) | "application/json" | "text/plain") | undefined;
                schema?: {
                    [k: string]: any;
                } | undefined;
                type: "text";
            } | {
                aspect_ratio?: ((string & {}) | "9:16" | "16:9") | undefined;
                delivery?: ((string & {}) | "uri" | "inline") | undefined;
                duration?: string | undefined;
                gcs_uri?: string | undefined;
                resolution?: ((string & {}) | "360p" | "720p" | "1080p" | "4k") | undefined;
                type: "video";
            } | {
                [k: string]: any;
            }> | undefined;
            response_mime_type?: string | undefined;
            response_modalities?: Array<"image" | (string & {}) | "video" | "text" | "audio" | "document"> | undefined;
            safety_settings?: Array<{
                method?: ((string & {}) | "severity" | "probability") | undefined;
                threshold: (string & {}) | "off" | "block_low_and_above" | "block_medium_and_above" | "block_only_high" | "block_none";
                type: (string & {}) | "hate_speech" | "dangerous_content" | "harassment" | "sexually_explicit" | "civic_integrity" | "image_hate" | "image_dangerous_content" | "image_harassment" | "image_sexually_explicit" | "jailbreak";
            }> | undefined;
            service_tier?: ((string & {}) | "flex" | "standard" | "priority" | "deferred") | undefined;
            status: (string & {}) | "in_progress" | "requires_action" | "completed" | "failed" | "cancelled" | "incomplete" | "budget_exceeded" | "queued";
            steps?: Array<{
                arguments: {
                    code?: string | undefined;
                    language?: "python" | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "code_execution_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: string;
                signature?: string | undefined;
                type: "code_execution_result";
            } | {
                id: string;
                signature?: string | undefined;
                type: "file_search_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "file_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                type: "function_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                type: "function_result";
            } | {
                arguments?: {
                    queries?: Array<string> | undefined;
                } | undefined;
                id: string;
                signature?: string | undefined;
                type: "google_maps_call";
            } | {
                call_id: string;
                result: Array<{
                    places?: Array<{
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        url?: string | undefined;
                    }> | undefined;
                    widget_context_token?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_maps_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                search_type?: ((string & {}) | "web_search" | "image_search" | "enterprise_web_search") | undefined;
                signature?: string | undefined;
                type: "google_search_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    search_suggestions?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                server_name: string;
                type: "mcp_server_tool_call";
            } | {
                call_id: string;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                server_name?: string | undefined;
                type: "mcp_server_tool_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                error?: {
                    code?: number | undefined;
                    details?: Array<{
                        [k: string]: any;
                    }> | undefined;
                    message?: string | undefined;
                } | undefined;
                type: "model_output";
            } | {
                id: string;
                signature?: string | undefined;
                type: "processing_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "processing_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                retrieval_type?: ((string & {}) | "vertex_ai_search" | "rag_store" | "exa_ai_search" | "parallel_ai_search") | undefined;
                signature?: string | undefined;
                type: "retrieval_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                signature?: string | undefined;
                type: "retrieval_result";
            } | {
                signature?: string | undefined;
                summary?: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | undefined;
                type: "thought";
            } | {
                arguments: {
                    urls?: Array<string> | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "url_context_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    status?: ("error" | (string & {}) | "success" | "paywall" | "unsafe") | undefined;
                    url?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "url_context_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                type: "user_input";
            }> | undefined;
            system_instruction?: string | undefined;
            tools?: Array<{
                type: "code_execution";
            } | {
                disabled_safety_policies?: Array<(string & {}) | "financial_transactions" | "sensitive_data_modification" | "communication_tool" | "account_creation" | "data_modification" | "user_consent_management" | "legal_terms_and_agreements"> | undefined;
                enable_prompt_injection_detection?: boolean | undefined;
                environment?: ((string & {}) | "browser" | "mobile" | "desktop") | undefined;
                excluded_predefined_functions?: Array<string> | undefined;
                type: "computer_use";
            } | {
                file_search_store_names?: Array<string> | undefined;
                metadata_filter?: string | undefined;
                top_k?: number | undefined;
                type: "file_search";
            } | {
                description?: string | undefined;
                name?: string | undefined;
                parameters?: any | undefined;
                type: "function";
            } | {
                enable_widget?: boolean | undefined;
                latitude?: number | undefined;
                longitude?: number | undefined;
                type: "google_maps";
            } | {
                search_types?: Array<(string & {}) | "web_search" | "image_search" | "enterprise_web_search"> | undefined;
                type: "google_search";
            } | {
                allowed_tools?: Array<{
                    mode?: ((string & {}) | "auto" | "none" | "any" | "validated") | undefined;
                    tools?: Array<string> | undefined;
                }> | undefined;
                headers?: {
                    [k: string]: string;
                } | undefined;
                name?: string | undefined;
                type: "mcp_server";
                url?: string | undefined;
            } | {
                exa_ai_search_config?: {
                    api_key: string;
                    custom_config?: {
                        [k: string]: any;
                    } | undefined;
                } | undefined;
                parallel_ai_search_config?: {
                    api_key?: string | undefined;
                    custom_config?: {
                        [k: string]: any;
                    } | undefined;
                } | undefined;
                rag_store_config?: {
                    rag_resources?: Array<{
                        rag_corpus?: string | undefined;
                        rag_file_ids?: Array<string> | undefined;
                    }> | undefined;
                    rag_retrieval_config?: {
                        filter?: {
                            metadata_filter?: string | undefined;
                            vector_distance_threshold?: number | undefined;
                            vector_similarity_threshold?: number | undefined;
                        } | undefined;
                        hybrid_search?: {
                            alpha?: number | undefined;
                        } | undefined;
                        ranking?: {
                            model_name?: string | undefined;
                            ranking_config: "rank_service";
                        } | undefined;
                        top_k?: number | undefined;
                    } | undefined;
                    similarity_top_k?: number | undefined;
                    vector_distance_threshold?: number | undefined;
                } | undefined;
                retrieval_types?: Array<(string & {}) | "vertex_ai_search" | "rag_store" | "exa_ai_search" | "parallel_ai_search"> | undefined;
                type: "retrieval";
                vertex_ai_search_config?: {
                    datastores?: Array<string> | undefined;
                    engine?: string | undefined;
                } | undefined;
            } | {
                type: "url_context";
            }> | undefined;
            updated?: string | undefined;
            usage?: {
                cached_tokens_by_modality?: Array<{
                    modality?: ("image" | (string & {}) | "video" | "text" | "audio" | "document") | undefined;
                    tokens?: number | undefined;
                }> | undefined;
                grounding_tool_count?: Array<{
                    count?: number | undefined;
                    type?: ((string & {}) | "google_maps" | "google_search" | "retrieval") | undefined;
                }> | undefined;
                input_tokens_by_modality?: Array<{
                    modality?: ("image" | (string & {}) | "video" | "text" | "audio" | "document") | undefined;
                    tokens?: number | undefined;
                }> | undefined;
                output_tokens_by_modality?: Array<{
                    modality?: ("image" | (string & {}) | "video" | "text" | "audio" | "document") | undefined;
                    tokens?: number | undefined;
                }> | undefined;
                tool_use_tokens_by_modality?: Array<{
                    modality?: ("image" | (string & {}) | "video" | "text" | "audio" | "document") | undefined;
                    tokens?: number | undefined;
                }> | undefined;
                total_cached_tokens?: number | undefined;
                total_input_tokens?: number | undefined;
                total_output_tokens?: number | undefined;
                total_thought_tokens?: number | undefined;
                total_tokens?: number | undefined;
                total_tool_use_tokens?: number | undefined;
            } | undefined;
            webhook_config?: {
                uris?: Array<string> | undefined;
                user_metadata?: {
                    [k: string]: any;
                } | undefined;
            } | undefined;
        }, "steps"> & {
            steps: ({
                arguments: {
                    code?: string | undefined;
                    language?: "python" | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "code_execution_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: string;
                signature?: string | undefined;
                type: "code_execution_result";
            } | {
                id: string;
                signature?: string | undefined;
                type: "file_search_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "file_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                type: "function_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                type: "function_result";
            } | {
                arguments?: {
                    queries?: Array<string> | undefined;
                } | undefined;
                id: string;
                signature?: string | undefined;
                type: "google_maps_call";
            } | {
                call_id: string;
                result: Array<{
                    places?: Array<{
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        url?: string | undefined;
                    }> | undefined;
                    widget_context_token?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_maps_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                search_type?: ((string & {}) | "web_search" | "image_search" | "enterprise_web_search") | undefined;
                signature?: string | undefined;
                type: "google_search_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    search_suggestions?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "google_search_result";
            } | {
                arguments: {
                    [k: string]: any;
                };
                id: string;
                name: string;
                server_name: string;
                type: "mcp_server_tool_call";
            } | {
                call_id: string;
                name?: string | undefined;
                result: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | {} | string;
                server_name?: string | undefined;
                type: "mcp_server_tool_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                error?: {
                    code?: number | undefined;
                    details?: Array<{
                        [k: string]: any;
                    }> | undefined;
                    message?: string | undefined;
                } | undefined;
                type: "model_output";
            } | {
                id: string;
                signature?: string | undefined;
                type: "processing_call";
            } | {
                call_id: string;
                signature?: string | undefined;
                type: "processing_result";
            } | {
                arguments: {
                    queries?: Array<string> | undefined;
                };
                id: string;
                retrieval_type?: ((string & {}) | "vertex_ai_search" | "rag_store" | "exa_ai_search" | "parallel_ai_search") | undefined;
                signature?: string | undefined;
                type: "retrieval_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                signature?: string | undefined;
                type: "retrieval_result";
            } | {
                signature?: string | undefined;
                summary?: Array<{
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                }> | undefined;
                type: "thought";
            } | {
                arguments: {
                    urls?: Array<string> | undefined;
                };
                id: string;
                signature?: string | undefined;
                type: "url_context_call";
            } | {
                call_id: string;
                is_error?: boolean | undefined;
                result: Array<{
                    status?: ("error" | (string & {}) | "success" | "paywall" | "unsafe") | undefined;
                    url?: string | undefined;
                }>;
                signature?: string | undefined;
                type: "url_context_result";
            } | {
                content?: Array<{
                    channels?: number | undefined;
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | undefined;
                    sample_rate?: number | undefined;
                    type: "audio";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "application/pdf" | "text/csv") | undefined;
                    type: "document";
                    uri?: string | undefined;
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "image";
                    uri?: string | undefined;
                } | {
                    annotations?: Array<{
                        custom_metadata?: {
                            [k: string]: any;
                        } | undefined;
                        document_uri?: string | undefined;
                        end_index?: number | undefined;
                        file_name?: string | undefined;
                        media_id?: string | undefined;
                        page_number?: number | undefined;
                        source?: string | undefined;
                        start_index?: number | undefined;
                        type: "file_citation";
                    } | {
                        end_index?: number | undefined;
                        name?: string | undefined;
                        place_id?: string | undefined;
                        review_snippets?: Array<{
                            review_id?: string | undefined;
                            title?: string | undefined;
                            url?: string | undefined;
                        }> | undefined;
                        start_index?: number | undefined;
                        type: "place_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        start_index?: number | undefined;
                        title?: string | undefined;
                        type: "url_citation";
                        url?: string | undefined;
                    } | {
                        end_index?: number | undefined;
                        end_offset?: string | undefined;
                        speaker?: string | undefined;
                        start_index?: number | undefined;
                        start_offset?: string | undefined;
                        text?: string | undefined;
                        type: "word_info";
                    }> | undefined;
                    text: string;
                    type: "text";
                } | {
                    data?: string | undefined;
                    mime_type?: ((string & {}) | "video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | undefined;
                    name?: string | undefined;
                    processing?: {
                        end_offset?: string | undefined;
                        fps?: number | undefined;
                        start_offset?: string | undefined;
                        type: "static";
                    } | ((string & {}) | "static" | "agentic") | undefined;
                    resolution?: ((string & {}) | "low" | "medium" | "high" | "ultra_high") | undefined;
                    type: "video";
                    uri?: string | undefined;
                }> | undefined;
                type: "user_input";
            })[];
        } & {
            sdkHttpResponse?: {
                headers?: Record<string, string>;
                responseInternal: globalThis.Response;
                json(): Promise<unknown>;
            };
        };
    }>;
}
