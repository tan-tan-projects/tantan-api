var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
let IpGeolocation = class IpGeolocation {
    id;
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
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], IpGeolocation.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "ip", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "country", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "country_code", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "region", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "city", void 0);
__decorate([
    Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], IpGeolocation.prototype, "latitude", void 0);
__decorate([
    Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], IpGeolocation.prototype, "longitude", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "isp", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "organization", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "asn", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], IpGeolocation.prototype, "timezone", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], IpGeolocation.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], IpGeolocation.prototype, "updated_at", void 0);
IpGeolocation = __decorate([
    Entity('IpGeolocation')
], IpGeolocation);
export { IpGeolocation };
//# sourceMappingURL=ip-geolocation.entity.js.map