import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './entities/auction.entity';
import { CarsService } from 'src/cars/cars.service';
import { Car, CarSchema } from 'src/cars/entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService, CarsService],
})
export class AuctionsModule {}
