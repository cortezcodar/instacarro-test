import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "./config/validationPipe";
import * as session from "express-session";
import { SwaggerInit } from "./config/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    allowedHeaders: "* .",
    origin: true,
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  SwaggerInit(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
