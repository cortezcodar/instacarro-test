/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Auction, AuctionDocument } from "./entities/auction.entity";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { FilterQuery, Model } from "mongoose";
import { CarsService } from "src/cars/cars.service";
import { AuctionFilters } from "./auctionFilters";
import { AuctionStatusEnum } from "./dto/auctionStatus.enum";
import { CreateAuctionDto } from "./dto/createAuction.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuctionsService {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>,
    private CarsService: CarsService
  ) {}

  async create(auction: CreateAuctionDto, CarId: string, userId: string) {
    const CarFromUser = await this.CarsService.findOne(CarId, userId);
    if (!CarFromUser) {
      throw new NotFoundException("Car not found!");
    }
    auction.status = auction?.status ?? AuctionStatusEnum.AWAITING;
    const auctionSaved = await this.auctionModel
      .findOneAndUpdate(
        {
          Car: CarId,
        },
        auction,
        { upsert: true }
      )
      .exec();
    await this.CarsService.update(CarId, { auction: auctionSaved }, userId);
    return auctionSaved;
  }

  async findAll(filtersParams: AuctionFilters, userId: string) {
    const filter: FilterQuery<AuctionDocument> = {};
    if (filtersParams?.byMe) {
      filter._id = (await this.CarsService.findAll(userId))
        .map(({ auction }) => auction ?? undefined)
        .filter((auction) => !!auction);
    }
    const auctionsQuery = await this.auctionModel
      .find(filter)
      .populate("Car", " description images");
    return auctionsQuery;
  }

  async findOne(id: string) {
    return await this.auctionModel
      .findById(id)
      .populate("Car", "model description version image")
      .populate({
        path: "bids",
        populate: {
          path: "user",
          model: User.name,
          select: "name",
        },
      });
  }

  async update(
    id: string,
    auction: Omit<Partial<Auction>, "Car">,
    userId: string
  ) {
    const auctionSearch = await this.auctionModel.findById(id).populate("Car");

    // eslint-disable-next-line
    // @ts-ignore
    if (auctionSearch.Car.user._id.toString() != userId) {
      throw new NotFoundException("Auction not found!");
    }
    const auctionUpdated = await this.auctionModel
      .findByIdAndUpdate(id, auction)
      .exec();
    return auctionUpdated.toObject();
  }

  async remove(id: string, userId: string) {
    const auctionSearch = (await this.findOne(id)).populate("Car.user");
    // eslint-disable-next-line
    // @ts-ignore
    if (auctionSearch.Car.user != userId) {
      throw new NotFoundException("Auction not found!");
    }
    const objId = new mongoose.Types.ObjectId(id);
    const deleted = await this.auctionModel.deleteOne({ _id: objId });
    return deleted.deletedCount === 1;
  }

  async isAcceptBids(id: string): Promise<boolean> {
    return (
      (await this.auctionModel
        .count({
          _id: id,
          status: AuctionStatusEnum.ACCEPTING_BID,
        })
        .exec()) > 0
    );
  }
}
