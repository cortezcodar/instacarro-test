import * as mongoose from 'mongoose';
import { Car } from 'src/cars/entities/car.entity';
export type UserDocument = User & mongoose.Document;
export declare class User {
    name: string;
    email: string;
    password?: string;
    Cars?: Car[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}>;
