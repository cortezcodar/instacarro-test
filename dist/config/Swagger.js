"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerInite = void 0;
const swagger_1 = require("@nestjs/swagger");
function SwaggerInite(app) {
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle(process.env.APP_NAME)
        .setDescription(process.env.APP_DESCRIPTION)
        .setVersion('1.0')
        .addCookieAuth(process.env.ACCESS_TOKEN_COOKIE_NAME)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('docs', app, document);
}
exports.SwaggerInite = SwaggerInite;
//# sourceMappingURL=Swagger.js.map