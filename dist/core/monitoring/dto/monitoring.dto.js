var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
export class MonitoringDTO {
    method;
    url;
    user;
    ip;
    status;
    error;
    duration;
}
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "method", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "user", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "ip", void 0);
__decorate([
    IsNotEmpty(),
    Min(100),
    IsNumber(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "error", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Object)
], MonitoringDTO.prototype, "duration", void 0);
//# sourceMappingURL=monitoring.dto.js.map