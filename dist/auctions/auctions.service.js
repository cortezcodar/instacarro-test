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
exports.AuctionsService = void 0;
const common_1 = require("@nestjs/common");
const auction_entity_1 = require("./entities/auction.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cars_service_1 = require("../cars/cars.service");
const auctionStatus_enum_1 = require("./dto/auctionStatus.enum");
const user_entity_1 = require("../users/entities/user.entity");
let AuctionsService = class AuctionsService {
    constructor(auctionModel, CarsService) {
        this.auctionModel = auctionModel;
        this.CarsService = CarsService;
    }
    async create(auction, CarId, userId) {
        var _a;
        const CarFromUser = await this.CarsService.findOne(CarId, userId);
        if (!CarFromUser) {
            throw new common_1.NotFoundException("Car not found!");
        }
        auction.status = (_a = auction === null || auction === void 0 ? void 0 : auction.status) !== null && _a !== void 0 ? _a : auctionStatus_enum_1.AuctionStatusEnum.AWAITING;
        const auctionSaved = await this.auctionModel
            .findOneAndUpdate({
            Car: CarId,
        }, auction, { upsert: true })
            .exec();
        await this.CarsService.update(CarId, { auction: auctionSaved }, userId);
        return auctionSaved;
    }
    async findAll(filtersParams, userId) {
        const filter = {};
        if (filtersParams === null || filtersParams === void 0 ? void 0 : filtersParams.byMe) {
            filter._id = (await this.CarsService.findAll(userId))
                .map(({ auction }) => auction !== null && auction !== void 0 ? auction : undefined)
                .filter((auction) => !!auction);
        }
        const auctionsQuery = await this.auctionModel
            .find(filter)
            .populate("Car", " description images");
        return auctionsQuery;
    }
    async findOne(id) {
        return await this.auctionModel
            .findById(id)
            .populate("Car", "model description version image")
            .populate({
            path: "bids",
            populate: {
                path: "user",
                model: user_entity_1.User.name,
                select: "name",
            },
        });
    }
    async update(id, auction, userId) {
        const auctionSearch = await this.auctionModel.findById(id).populate("Car");
        if (auctionSearch.Car.user._id.toString() != userId) {
            throw new common_1.NotFoundException("Auction not found!");
        }
        const auctionUpdated = await this.auctionModel
            .findByIdAndUpdate(id, auction)
            .exec();
        return auctionUpdated.toObject();
    }
    async remove(id, userId) {
        const auctionSearch = (await this.findOne(id)).populate("Car.user");
        if (auctionSearch.Car.user != userId) {
            throw new common_1.NotFoundException("Auction not found!");
        }
        const objId = new mongoose_2.default.Types.ObjectId(id);
        const deleted = await this.auctionModel.deleteOne({ _id: objId });
        return deleted.deletedCount === 1;
    }
    async isAcceptBids(id) {
        return ((await this.auctionModel
            .count({
            _id: id,
            status: auctionStatus_enum_1.AuctionStatusEnum.ACCEPTING_BID,
        })
            .exec()) > 0);
    }
};
AuctionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auction_entity_1.Auction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cars_service_1.CarsService])
], AuctionsService);
exports.AuctionsService = AuctionsService;
//# sourceMappingURL=auctions.service.js.map