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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidsService = void 0;
const common_1 = require("@nestjs/common");
const bid_entity_1 = require("./entities/bid.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auctions_service_1 = require("../auctions/auctions.service");
let BidsService = class BidsService {
    constructor(bidModel, auctionsService) {
        this.bidModel = bidModel;
        this.auctionsService = auctionsService;
    }
    async create(bid, auctionId, userId) {
        var _a;
        const isAuctionAcceptBids = await this.auctionsService.isAcceptBids(auctionId);
        if (!isAuctionAcceptBids) {
            throw new common_1.BadRequestException('This auction is not accepting bids');
        }
        const bidCreated = await new this.bidModel(Object.assign(Object.assign({}, bid), { auction: auctionId, user: userId })).save();
        const auction = await this.auctionsService.findOne(auctionId);
        auction.bids = (_a = auction === null || auction === void 0 ? void 0 : auction.bids) !== null && _a !== void 0 ? _a : [];
        auction.bids.push(bidCreated);
        await auction.save();
        return bidCreated;
    }
    async findAll(userId) {
        const bidsQuery = this.bidModel
            .find({
            user: userId,
        })
            .populate('bid.auction.Car', 'title description category images')
            .populate('bid');
        return await bidsQuery.exec();
    }
};
BidsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bid_entity_1.Bid.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auctions_service_1.AuctionsService])
], BidsService);
exports.BidsService = BidsService;
//# sourceMappingURL=bids.service.js.map