import * as mongoose from 'mongoose';
import { Bid } from 'src/bid/entities/bid.entity';
import { Car } from 'src/cars/entities/car.entity';
export type AuctionDocument = Auction & mongoose.Document;
export declare class Auction {
    Car: Car;
    status: string;
    bids: Bid[];
}
export declare const AuctionSchema: mongoose.Schema<Auction, mongoose.Model<Auction, any, any, any, mongoose.Document<unknown, any, Auction> & Auction & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Auction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Auction>> & mongoose.FlatRecord<Auction> & {
    _id: mongoose.Types.ObjectId;
}>;
