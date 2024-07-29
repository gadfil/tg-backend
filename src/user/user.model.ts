import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, description: 'The  telegram id of the user' })
  id: number;

  @Prop()
  username: string;

  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  photo_url: string;

  @Prop({ required: true })
  is_bot: boolean;

  @Prop({ required: true })
  language_code: string;

  @Prop()
  is_premium: boolean;

  @Prop()
  allows_write_to_pm: boolean;

  @Prop({ required: false })
  referalId?: number;

  @Prop({ required: false })
  source: string;

  @Prop({ default: 0 })
  inviteCount: number;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ default: 0 })
  power: number;

  @Prop({ default: 0 })
  dailyPower: number;

  @Prop({ default: 1 })
  level: number;

  @Prop({ required: false })
  twitterId?: string;

  @Prop({ required: false })
  twitterHandle?: string;

  @Prop({ required: false })
  twitterScore?: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
