"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionsModule = void 0;
const common_1 = require("@nestjs/common");
const auctions_service_1 = require("./auctions.service");
const auctions_controller_1 = require("./auctions.controller");
const mongoose_1 = require("@nestjs/mongoose");
const auction_entity_1 = require("./entities/auction.entity");
const cars_service_1 = require("../cars/cars.service");
const car_entity_1 = require("../cars/entities/car.entity");
let AuctionsModule = class AuctionsModule {
};
AuctionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: auction_entity_1.Auction.name, schema: auction_entity_1.AuctionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: car_entity_1.Car.name, schema: car_entity_1.CarSchema }]),
        ],
        controllers: [auctions_controller_1.AuctionsController],
        providers: [auctions_service_1.AuctionsService, cars_service_1.CarsService],
    })
], AuctionsModule);
exports.AuctionsModule = AuctionsModule;
//# sourceMappingURL=auctions.module.js.map