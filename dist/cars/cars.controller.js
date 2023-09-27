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
exports.CarsController = void 0;
const common_1 = require("@nestjs/common");
const cars_service_1 = require("./cars.service");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const createCar_dto_1 = require("./dto/createCar.dto");
const updateProduct_dto_1 = require("./dto/updateProduct.dto");
let CarsController = class CarsController {
    constructor(CarsService) {
        this.CarsService = CarsService;
    }
    async create(Car, req, res) {
        const { model, version, brand, year, km, price, color, manufacture, plate, mileage, image, } = Car;
        const CarCreated = await this.CarsService.create({
            model,
            version,
            brand,
            km,
            price,
            color,
            manufacture,
            plate,
            mileage,
            image,
            year,
        }, req.user.id);
        return res.status(common_1.HttpStatus.CREATED).json(CarCreated);
    }
    async findAll(req, res) {
        const Cars = await this.CarsService.findAll(req.user.id);
        return res.json(Cars);
    }
    async findOne(id, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Car not found!');
        }
        const Cars = await this.CarsService.findOne(id, req.user.id);
        return res.json(Cars);
    }
    async update(id, updateCarDto, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Car not found!');
        }
        const Car = await this.CarsService.update(id, updateCarDto, req.user.id);
        return res.json(Car);
    }
    async remove(id, req, res) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Car not found!');
        }
        await this.CarsService.remove(id, req.user.id);
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
    __metadata("design:paramtypes", [createCar_dto_1.CreateCarDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateProduct_dto_1.UpdateCarDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "remove", null);
CarsController = __decorate([
    (0, swagger_1.ApiTags)('Cars'),
    (0, swagger_1.ApiCookieAuth)(process.env.ACCESS_TOKEN_COOKIE_NAME),
    (0, common_1.Controller)('Cars'),
    __metadata("design:paramtypes", [cars_service_1.CarsService])
], CarsController);
exports.CarsController = CarsController;
//# sourceMappingURL=cars.controller.js.map