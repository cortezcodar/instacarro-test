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
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const car_entity_1 = require("./entities/car.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CarsService = class CarsService {
    constructor(CarModel) {
        this.CarModel = CarModel;
    }
    async create(Car, userId) {
        const createdCar = new this.CarModel(Object.assign(Object.assign({}, Car), { user: userId }));
        return await createdCar.save();
    }
    async findAll(userId) {
        const Cars = await this.CarModel.find({
            user: userId,
        }).exec();
        return Cars;
    }
    async findOne(id, userId) {
        const Cars = await this.CarModel.findOne({
            _id: id,
            user: userId,
        }).exec();
        return Cars;
    }
    async update(id, Car, userId) {
        const CarUpdated = await this.CarModel.findOneAndUpdate({ _id: id, user: userId }, Car, { new: true }).exec();
        return CarUpdated.toObject();
    }
    async remove(id, userId) {
        const CarFromUser = await this.findOne(id, userId);
        if (!CarFromUser) {
            throw new common_1.NotFoundException('Car not found!');
        }
        const objId = new mongoose_2.Types.ObjectId(id);
        const deleted = await this.CarModel.deleteOne({ _id: objId });
        return deleted.deletedCount === 1;
    }
};
CarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(car_entity_1.Car.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarsService);
exports.CarsService = CarsService;
//# sourceMappingURL=cars.service.js.map