import * as mongoose from 'mongoose';
import { Auction } from 'src/auctions/entities/auction.entity';
import { User } from 'src/users/entities/user.entity';
export type BidDocument = Bid & mongoose.Document;
export declare class Bid {
    auction: Auction;
    user: User;
    amount: number;
}
export declare const BidSchema: mongoose.Schema<Bid, mongoose.Model<Bid, any, any, any, mongoose.Document<unknown, any, Bid> & Bid & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Bid, mongoose.Document<unknown, {}, mongoose.FlatRecord<Bid>> & mongoose.FlatRecord<Bid> & {
    _id: mongoose.Types.ObjectId;
}>;
