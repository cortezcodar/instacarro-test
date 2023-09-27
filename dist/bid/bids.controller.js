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
exports.BidsController = void 0;
const common_1 = require("@nestjs/common");
const bids_service_1 = require("./bids.service");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const createBid_dto_1 = require("./dto/createBid.dto");
let BidsController = class BidsController {
    constructor(bidsService) {
        this.bidsService = bidsService;
    }
    async create(bid, req, res) {
        const { auction, amount } = bid;
        if (!mongoose_1.Types.ObjectId.isValid(auction)) {
            throw new common_1.BadRequestException('auction is not a valid id!');
        }
        const bidCreated = await this.bidsService.create({ amount }, auction, req.user.id);
        return res.status(common_1.HttpStatus.CREATED).json(bidCreated);
    }
    async findAll(req, res) {
        const bids = await this.bidsService.findAll(req.user.id);
        return res.json(bids);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBid_dto_1.CreateBidDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BidsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BidsController.prototype, "findAll", null);
BidsController = __decorate([
    (0, swagger_1.ApiTags)('Bids'),
    (0, swagger_1.ApiCookieAuth)(process.env.ACCESS_TOKEN_COOKIE_NAME),
    (0, common_1.Controller)('bids'),
    __metadata("design:paramtypes", [bids_service_1.BidsService])
], BidsController);
exports.BidsController = BidsController;
//# sourceMappingURL=bids.controller.js.map