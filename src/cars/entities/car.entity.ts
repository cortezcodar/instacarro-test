import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Auction } from "../../auctions/entities/auction.entity";
import { User } from "../../users/entities/user.entity";

export type CarDocument = Car & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Car {
  @Prop({ required: "{PATH} is required!" })
  model: string;

  @Prop()
  version: string;

  @Prop()
  year: number;

  @Prop()
  image?: string[];

  @Prop()
  brand: string;

  @Prop()
  km: number;

  @Prop()
  price: string;

  @Prop()
  color: string;

  @Prop()
  manufacture: string;

  @Prop()
  plate: string;

  @Prop()
  mileage: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
  })
  auction?: Auction;
}

export const CarSchema = SchemaFactory.createForClass(Car);
