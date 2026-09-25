var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsIP, IsOptional, IsString, IsNumber } from "class-validator";
export class IpGeolocationDTO {
    ip;
    country;
    country_code;
    region;
    city;
    latitude;
    longitude;
    isp;
    organization;
    asn;
    timezone;
}
__decorate([
    IsIP(),
    __metadata("design:type", String)
], IpGeolocationDTO.prototype, "ip", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], IpGeolocationDTO.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], IpGeolocationDTO.prototype, "country_code", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], IpGeolocationDTO.prototype, "region", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], IpGeolocationDTO.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], IpGeolocationDTO.prototype, "latitude", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], IpGeolocationDTO.prototype, "longitude", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], IpGeolocationDTO.prototype, "isp", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], IpGeolocationDTO.prototype, "organization", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], IpGeolocationDTO.prototype, "asn", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], IpGeolocationDTO.prototype, "timezone", void 0);
//# sourceMappingURL=ip-geolocation.dto.js.map