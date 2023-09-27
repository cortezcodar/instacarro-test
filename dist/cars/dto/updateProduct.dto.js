"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const createCar_dto_1 = require("./createCar.dto");
class UpdateCarDto extends (0, swagger_1.PartialType)(createCar_dto_1.CreateCarDto) {
}
exports.UpdateCarDto = UpdateCarDto;
//# sourceMappingURL=updateProduct.dto.js.map