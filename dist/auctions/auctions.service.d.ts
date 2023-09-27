import { Auction, AuctionDocument } from './entities/auction.entity';
import mongoose, { Model } from 'mongoose';
import { CarsService } from 'src/cars/cars.service';
import { AuctionFilters } from './auctionFilters';
import { CreateAuctionDto } from './dto/createAuction.dto';
export declare class AuctionsService {
    private auctionModel;
    private CarsService;
    constructor(auctionModel: Model<AuctionDocument>, CarsService: CarsService);
    create(auction: CreateAuctionDto, CarId: string, userId: string): Promise<mongoose.Document<unknown, {}, AuctionDocument> & Auction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(filtersParams: AuctionFilters, userId: string): Promise<Omit<mongoose.Document<unknown, {}, AuctionDocument> & Auction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, AuctionDocument> & Auction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, auction: Omit<Partial<Auction>, 'Car'>, userId: string): Promise<Auction & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string, userId: string): Promise<boolean>;
    isAcceptBids(id: string): Promise<boolean>;
}
