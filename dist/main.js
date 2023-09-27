"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const validationPipe_1 = require("./config/validationPipe");
const session = require("express-session");
const swagger_1 = require("./config/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new validationPipe_1.ValidationPipe());
    app.enableCors({
        credentials: true,
        allowedHeaders: "* .",
        origin: true,
    });
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    (0, swagger_1.SwaggerInit)(app);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map