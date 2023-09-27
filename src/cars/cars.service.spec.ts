import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

describe('CarsService', () => {
  let service: CarsService;
  let usersService: UsersService;
  let user: User & {
    _id: Types.ObjectId;
  } & Required<{
      _id: Types.ObjectId;
    }>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);

    user = await usersService.create({
      name: 'furgao',
      email: 'fusca',
      password: 'chevet',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a Car', () => {
    const Car: Omit<Car, 'user'> = {
      model: '',
      version: '',
      year: 0,
      brand: '',
      km: 0,
      price: '',
      color: '',
      manufacture: '',
      plate: '',
      mileage: '',
    };
    expect(service.create(Car, user._id.toString())).toBe(Car);
  });
});
