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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./guards/auth.guard");
const auth_service_1 = require("./auth.service");
const singup_dto_1 = require("./dto/singup.dto");
const local_guard_1 = require("./guards/local.guard");
const swagger_1 = require("@nestjs/swagger");
const singin_dto_1 = require("./dto/singin.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpDto, res) {
        const { email, name, password } = signUpDto;
        const userCreated = await this.authService.signUp({
            email,
            name,
            password,
        });
        return res.status(common_1.HttpStatus.CREATED).json(userCreated);
    }
    async signIn(signInDto, req, res) {
        const auth = await this.authService.signIn(req.user);
        res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME, auth[process.env.ACCESS_TOKEN_COOKIE_NAME], {
            httpOnly: true,
        });
        return res.sendStatus(common_1.HttpStatus.OK);
    }
    async signOut(res) {
        return res
            .clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME)
            .sendStatus(common_1.HttpStatus.OK);
    }
    getProfile(req) {
        return this.authService.getProfile(req.user);
    }
};
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)("singup"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [singup_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, common_1.Post)("singin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [singin_dto_1.SignInDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)(process.env.ACCESS_TOKEN_COOKIE_NAME),
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)(process.env.ACCESS_TOKEN_COOKIE_NAME),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map