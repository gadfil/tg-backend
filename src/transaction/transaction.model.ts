import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import * as mongoose from 'mongoose';

export type TransactionDocument = Transaction & Document;
export enum TransactionType {
  RegistrationByReferralLink = 0,
  FirstReferral = 1,
  Referral3 = 2,
  Referral5 = 3,
  Referral10 = 4,
  FirstVictory = 5,
  VictoryClub = 6,
  DailyClaim = 7,
  LevelUp = 8,
  WalletConnect = 9,
  SubscribeTG = 10,
  TwiiterConnectSubscribe = 11,
  LotoWin = 12,
  BuyLotteryTicket = 13,
  DepositToGameCoinFlip = 14,
  DepositToGameRockPaperScissors = 15,
  BuyTwitterLotteryTicket = 16,
  RandomVictory10 = 17,
  Birthday = 18,
}

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Number, enum: TransactionType })
  transactionType: TransactionType;

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
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
