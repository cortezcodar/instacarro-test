import { Test, TestingModule } from "@nestjs/testing";
import { CarsService } from "./cars.service";
import { Car } from "src/cars/entities/car.entity";
import { UsersService } from "../users/users.service"; //
import { getModelToken } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import { Types } from "mongoose";

describe("CarsService", () => {
  let service: CarsService;
  let usersService: UsersService;
  let user: User & {
    _id: Types.ObjectId;
  } & Required<{
      _id: Types.ObjectId;
    }>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        UsersService,
        {
          provide: getModelToken(Car.name), // Substitua pelo nome correto da entidade do seu modelo
          useValue: {}, // Mock ou use o modelo real aqui, dependendo da necessidade do teste
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    usersService = module.get<UsersService>(UsersService);

    const user = await usersService.create({
      name: "furgao",
      email: "fusca",
      password: "chevet",
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

    const createdCar = await service.create(car, user._id.toString());

    expect(createdCar).toBeDefined();
    expect(createdCar.model).toBe(car.model);
    // Adicione mais expectativas de acordo com sua lógica de criação de carro
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

    const updatedCar = await service.update(id, car, user._id.toString());

    expect(updatedCar).toBeDefined();
    expect(updatedCar.model).toBe(car.model);
  });
});
