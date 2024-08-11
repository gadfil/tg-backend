import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.model';
@Schema()
export class Claim {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ default: 0, type: Number })
  coin: number;

  @Prop({ default: 0, type: Number })
  dailyEnergy: number;

  @Prop({ default: 0, type: Number })
  energy: number;

  @Prop({ default: 0, type: Number })
  stars: number;

  @Prop({ default: 0, type: Number })
  usdt: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type ClaimDocument = Claim & Document;

export const ClaimSchema = SchemaFactory.createForClass(User);
