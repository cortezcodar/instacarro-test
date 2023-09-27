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
exports.AuctionsController = void 0;
const common_1 = require("@nestjs/common");
const auctions_service_1 = require("./auctions.service");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const auctionFilters_1 = require("./auctionFilters");
const createAuction_dto_1 = require("./dto/createAuction.dto");
const updateAuction_dto_1 = require("./dto/updateAuction.dto");
let AuctionsController = class AuctionsController {
    constructor(auctionsService) {
        this.auctionsService = auctionsService;
    }
    async create(auction, req, res) {
        const { Car, status } = auction;
        if (!mongoose_1.Types.ObjectId.isValid(Car)) {
            throw new common_1.BadRequestException('CarId is not a valid id!');
        }
        const auctionCreated = await this.auctionsService.create({ status }, Car, req.user.id);
        return res.status(common_1.HttpStatus.CREATED).json(auctionCreated);
    }
    async findAll(params, req, res) {
        const auctions = await this.auctionsService.findAll(params, req.user.id);
        return res.json(auctions);
    }
    async findOne(id, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Auction not found!');
        }
        const auctions = await this.auctionsService.findOne(id);
        return res.json(auctions);
    }
    async update(id, updateAuctionDto, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Auction not found!');
        }
        const auction = await this.auctionsService.update(id, updateAuctionDto, req.user.id);
        return res.json(auction);
    }
    async remove(id, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Auction not found!');
        }
        await this.auctionsService.remove(id, req.user.id);
        return res.json({
            id,
            removed: true,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAuction_dto_1.CreateAuctionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auctionFilters_1.AuctionFilters, Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateAuction_dto_1.UpdateAuctionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "remove", null);
AuctionsController = __decorate([
    (0, swagger_1.ApiTags)('Auctions'),
    (0, swagger_1.ApiCookieAuth)(process.env.ACCESS_TOKEN_COOKIE_NAME),
    (0, common_1.Controller)('auctions'),
    __metadata("design:paramtypes", [auctions_service_1.AuctionsService])
], AuctionsController);
exports.AuctionsController = AuctionsController;
//# sourceMappingURL=auctions.controller.js.map