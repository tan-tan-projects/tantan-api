var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsArray } from 'class-validator';
import { PaginationDTO } from './pagination.dto.js';
export class QueryDTO {
    type;
    search;
    filter;
    select;
    searchFields;
    additional;
    pagination;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryDTO.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryDTO.prototype, "search", void 0);
__decorate([
    IsOptional(),
    Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Object.keys(parsed).length ? parsed : undefined;
            }
            catch {
                return undefined;
            }
        }
        return value && Object.keys(value).length ? value : undefined;
    }),
    __metadata("design:type", Object)
], QueryDTO.prototype, "filter", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value.length > 0 ? value : undefined;
        }
        if (typeof value === 'string') {
            const parsed = value.split(',').map(v => v.trim()).filter(Boolean);
            return parsed.length > 0 ? parsed : undefined;
        }
        return undefined;
    }),
    __metadata("design:type", Array)
], QueryDTO.prototype, "select", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value.length > 0 ? value : undefined;
        }
        if (typeof value === 'string') {
            const parsed = value.split(',').map(v => v.trim()).filter(Boolean);
            return parsed.length > 0 ? parsed : undefined;
        }
        return undefined;
    }),
    __metadata("design:type", Array)
], QueryDTO.prototype, "searchFields", void 0);
__decorate([
    IsOptional(),
    Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Object.keys(parsed).length ? parsed : undefined;
            }
            catch {
                return undefined;
            }
        }
        return value && Object.keys(value).length ? value : undefined;
    }),
    __metadata("design:type", Object)
], QueryDTO.prototype, "additional", void 0);
__decorate([
    IsOptional(),
    Type(() => PaginationDTO),
    Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Object.keys(parsed).length ? parsed : undefined;
            }
            catch {
                return undefined;
            }
        }
        return value && Object.keys(value).length ? value : undefined;
    }),
    __metadata("design:type", PaginationDTO)
], QueryDTO.prototype, "pagination", void 0);
//# sourceMappingURL=query.dto.js.map