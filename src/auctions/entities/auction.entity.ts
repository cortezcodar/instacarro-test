import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Bid } from 'src/bid/entities/bid.entity';
import { Car } from 'src/cars/entities/car.entity';

export type AuctionDocument = Auction & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Auction {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  })
  Car: Car;

  @Prop()
  status: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Bid',
  })
  bids: Bid[];
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
