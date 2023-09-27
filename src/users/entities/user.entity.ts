import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Car } from 'src/cars/entities/car.entity';

export type UserDocument = User & mongoose.Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Car',
  })
  Cars?: Car[];
}

export const UserSchema = SchemaFactory.createForClass(User);
