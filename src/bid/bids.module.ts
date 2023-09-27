import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from './entities/bid.entity';
import { AuctionsService } from 'src/auctions/auctions.service';
import { Auction, AuctionSchema } from 'src/auctions/entities/auction.entity';
import { CarsService } from 'src/cars/cars.service';
import { Car, CarSchema } from 'src/cars/entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }]),
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  ],
  controllers: [BidsController],
  providers: [BidsService, AuctionsService, CarsService],
})
export class BidsModule {}
