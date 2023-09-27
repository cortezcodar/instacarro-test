import { Injectable, NotFoundException } from '@nestjs/common';
import { Car, CarDocument } from './entities/car.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private CarModel: Model<CarDocument>) {}

  async create(Car: Omit<Car, 'user'>, userId: string): Promise<Car> {
    const createdCar = new this.CarModel({
      ...Car,
      user: userId,
    });
    return await createdCar.save();
  }

  async findAll(userId: string): Promise<Car[]> {
    const Cars = await this.CarModel.find({
      user: userId,
    }).exec();
    return Cars;
  }

  async findOne(id: string, userId: string): Promise<Car> {
    const Cars = await this.CarModel.findOne({
      _id: id,
      user: userId,
    }).exec();
    return Cars;
  }

  async update(id: string, Car: Partial<Car>, userId: string): Promise<Car> {
    const CarUpdated = await this.CarModel.findOneAndUpdate(
      { _id: id, user: userId },
      Car,
      { new: true },
    ).exec();
    return CarUpdated.toObject();
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const CarFromUser = await this.findOne(id, userId);
    if (!CarFromUser) {
      throw new NotFoundException('Car not found!');
    }
    const objId = new Types.ObjectId(id);
    const deleted = await this.CarModel.deleteOne({ _id: objId });
    return deleted.deletedCount === 1;
  }
}
