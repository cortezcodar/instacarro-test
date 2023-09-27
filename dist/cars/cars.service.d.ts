import { Car, CarDocument } from './entities/car.entity';
import { Model } from 'mongoose';
export declare class CarsService {
    private CarModel;
    constructor(CarModel: Model<CarDocument>);
    create(Car: Omit<Car, 'user'>, userId: string): Promise<Car>;
    findAll(userId: string): Promise<Car[]>;
    findOne(id: string, userId: string): Promise<Car>;
    update(id: string, Car: Partial<Car>, userId: string): Promise<Car>;
    remove(id: string, userId: string): Promise<boolean>;
}
