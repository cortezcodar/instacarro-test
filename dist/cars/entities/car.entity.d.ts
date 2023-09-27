import * as mongoose from "mongoose";
import { Auction } from "../../auctions/entities/auction.entity";
import { User } from "../../users/entities/user.entity";
export type CarDocument = Car & mongoose.Document;
export declare class Car {
    model: string;
    version: string;
    year: number;
    image?: string[];
    brand: string;
    km: number;
    price: string;
    color: string;
    manufacture: string;
    plate: string;
    mileage: string;
    user: User;
    auction?: Auction;
}
export declare const CarSchema: mongoose.Schema<Car, mongoose.Model<Car, any, any, any, mongoose.Document<unknown, any, Car> & Car & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Car, mongoose.Document<unknown, {}, mongoose.FlatRecord<Car>> & mongoose.FlatRecord<Car> & {
    _id: mongoose.Types.ObjectId;
}>;
