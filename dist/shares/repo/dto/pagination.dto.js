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
import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
export class PaginationDTO {
    sortBy = '';
    descending = false;
    page = 1;
    rowsPerPage = 25;
}
__decorate([
    ValidateIf((o) => o.sortBy),
    IsString(),
    __metadata("design:type", String)
], PaginationDTO.prototype, "sortBy", void 0);
__decorate([
    Transform(({ value }) => {
        if (typeof value === 'boolean')
            return value;
        if (typeof value === 'string') {
            return value === 'true';
        }
        return false;
    }),
    IsBoolean(),
    __metadata("design:type", Boolean)
], PaginationDTO.prototype, "descending", void 0);
__decorate([
    IsNotEmpty(),
    IsNumber(),
    Type(() => Number),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "page", void 0);
__decorate([
    IsNotEmpty(),
    IsNumber(),
    Type(() => Number),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "rowsPerPage", void 0);
//# sourceMappingURL=pagination.dto.js.map