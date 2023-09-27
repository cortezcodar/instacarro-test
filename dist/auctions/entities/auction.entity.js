"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionSchema = exports.Auction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const car_entity_1 = require("../../cars/entities/car.entity");
let Auction = class Auction {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    }),
    __metadata("design:type", car_entity_1.Car)
], Auction.prototype, "Car", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Auction.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Bid',
    }),
    __metadata("design:type", Array)
], Auction.prototype, "bids", void 0);
Auction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Auction);
exports.Auction = Auction;
exports.AuctionSchema = mongoose_1.SchemaFactory.createForClass(Auction);
//# sourceMappingURL=auction.entity.js.map