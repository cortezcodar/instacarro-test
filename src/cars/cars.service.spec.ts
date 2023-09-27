import { Test, TestingModule } from "@nestjs/testing";
import { CarsService } from "./cars.service";
import { User } from "../users/entities/user.entity";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UsersService } from "../users/users.service";
import { Car } from "./entities/car.entity";

describe("CarsService", () => {
  let service: CarsService;
  let usersService: UsersService;
  let userModel: Model<User>;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
        // ...
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));

    user = await usersService.create({
      name: "Test user",
      email: "test@test.com",
      password: "TestPass",
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create a Car", async () => {
    const car: Omit<Car, "user"> = {
      model: "",
      version: "",
      year: 0,
      brand: "",
      km: 0,
      price: "",
      color: "",
      manufacture: "",
      plate: "",
      mileage: "",
    };
    const _id = "dsd";

    const createdCar = await service.create(car, _id);

    expect(createdCar).toBeDefined();
    expect(createdCar.model).toBe(car.model);
  });

  it("update a Car", async () => {
    const car: Omit<Car, "user"> = {
      model: "",
      version: "",
      year: 0,
      brand: "",
      km: 0,
      price: "",
      color: "",
      manufacture: "",
      plate: "",
      mileage: "",
    };
    const id = "1";

    const updatedCar = await service.update(id, car, id);

    expect(updatedCar).toBeDefined();
    expect(updatedCar.model).toBe(car.model);
  });
});
