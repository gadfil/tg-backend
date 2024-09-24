import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;
  @Prop({
    required: true,
    index: true,
    immutable: true,
    description: 'The  telegram id of the user',
  })
  id: number;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  firstName: string;
  @Prop({ required: false })
  lastName: string;
  @Prop({ required: false })
  photo_url: string;

  @Prop({ required: false })
  isBot: boolean;

  @Prop({ required: false })
  languageCode: string;

  @Prop({ required: false })
  isPremium: boolean;

  @Prop({ required: false })
  allowsWriteToPm: boolean;

  @Prop({ required: false })
  referralId?: number;

  @Prop({ required: false })
  source: string;

  @Prop({ default: 0 })
  victory: number;

  @Prop({ default: 0 })
  inviteCount: number;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ type: Number, default: 1 })
  tickets: number;

  @Prop({ default: 0 })
  energy: number;

  @Prop({ default: 0 })
  dailyEnergy: number;

  @Prop({ default: 1 })
  level: number;

  @Prop({ required: false })
  twitterId?: string;

  @Prop({ required: false })
  twitterHandle?: string;

  @Prop({ required: false })
  twitterScore?: number;

  @Prop({ type: [Number], default: [] })
  rewards: number[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
