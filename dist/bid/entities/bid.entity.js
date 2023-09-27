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
exports.BidSchema = exports.Bid = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const auction_entity_1 = require("../../auctions/entities/auction.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Bid = class Bid {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
    }),
    __metadata("design:type", auction_entity_1.Auction)
], Bid.prototype, "auction", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }),
    __metadata("design:type", user_entity_1.User)
], Bid.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.Number,
    }),
    __metadata("design:type", Number)
], Bid.prototype, "amount", void 0);
Bid = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Bid);
exports.Bid = Bid;
exports.BidSchema = mongoose_1.SchemaFactory.createForClass(Bid);
//# sourceMappingURL=bid.entity.js.map