import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UnauthorizedException, HttpException } from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let usersServiceMock;
  let jwtServiceMock;

  beforeEach(async () => {
    usersServiceMock = {
      exists: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
    };

    jwtServiceMock = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: "1m" },
        }),
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: process.env.DATABASE_URL,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
          }),
        }),
      ],
      providers: [
        AuthService,
        {
          provide: "UsersService",
          useValue: usersServiceMock,
        },
        {
          provide: "JwtService",
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("validateUser", () => {
    it("should return a user if valid email and password are provided", async () => {
      const mockUser = {
        email: "test@example.com",
        password: await service.bcrypt("password123"),
      };
      usersServiceMock.findOne.mockResolvedValue(mockUser);

      const user = await service.validateUser(
        "test@example.com",
        "password123"
      );

      expect(user).toEqual(
        expect.objectContaining({ email: "test@example.com" })
      );
    });

    it("should throw UnauthorizedException if invalid email or password are provided", async () => {
      usersServiceMock.findOne.mockResolvedValue(null);

      try {
        await service.validateUser("invalid@example.com", "invalidpassword");
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe("signIn", () => {
    it("should return a JWT token upon successful sign-in", async () => {
      const mockUser = {
        email: "test@example.com",
        _id: "mockUserId",
      };

      jwtServiceMock.signAsync.mockResolvedValue("mockJwtToken");

      const token = await service.signIn(mockUser);

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
        { email: "test@example.com", sub: "mockUserId" },
        expect.any(Object)
      );
      expect(token).toEqual({
        [process.env.ACCESS_TOKEN_COOKIE_NAME]: "mockJwtToken",
      });
    });
  });
});
