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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { email } = signUpDto;
        const userExists = await this.usersService.exists({ email });
        if (userExists) {
            throw new common_1.HttpException('User already exists', 400);
        }
        const hashedPassword = await this.bcrypt(signUpDto.password);
        const _a = await this.usersService.create(Object.assign(Object.assign({}, signUpDto), { password: hashedPassword })), { password } = _a, user = __rest(_a, ["password"]);
        return user;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne({ email });
        const isValidePassword = await bcrypt.compare(pass, user === null || user === void 0 ? void 0 : user.password);
        if (!isValidePassword) {
            throw new common_1.UnauthorizedException();
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async signIn(user) {
        const payload = { email: user.email, sub: user._id };
        return {
            [process.env.ACCESS_TOKEN_COOKIE_NAME]: await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
            }),
        };
    }
    async getProfile(user) {
        const _a = await this.usersService.findOne({
            email: user.email,
        }), { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async bcrypt(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Dependencies)(users_service_1.UsersService, jwt_1.JwtService),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map