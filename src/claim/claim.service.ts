import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Claim, ClaimDocument } from './claim.model';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
    @Inject(forwardRef(() => TransactionService))
    private readonly transactionService: TransactionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  #generateRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  #claimDailyReward() {}

  async getDailyClaim(id: number) {
    // check if user has already claimed
    const isClaimed = await this.checkClaimByTelegramId(id);
    if (!isClaimed) {
      throw new BadRequestException('Daily reward already claimed.');
    }
    // const user = await this.userService.findUserByTelegramId(id);
    //24 * 60 * 60 * 1000 = 86400000
    const twentyFourHoursAgo = new Date(Date.now() - 86400000);

    // const claim = await this.claimModel
    //   .findOne({ user: user._id, createdAt: { $gte: twentyFourHoursAgo } })
    //   .lean()
    //   .sort({ createdAt: -1 })
    //   .exec();
    // return 'claim';
  }

  async checkClaim(_id: Types.ObjectId) {
    // check if user has already claimed
    //24 * 60 * 60 * 1000 = 86400000
    const twentyFourHoursAgo = new Date(Date.now() - 86400000);

    const claim = await this.claimModel
      .findOne({ user: _id, createdAt: { $gte: twentyFourHoursAgo } })
      .lean()
      .sort({ createdAt: -1 })
      .exec();
    return !!claim;
  }

  async checkClaimByTelegramId(id: number) {
    // Calculate the time 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 86400000);

    // Find the latest claim by user id within the last 24 hours
    const claim = await this.claimModel
      .findOne({ 'user.id': id, createdAt: { $gte: twentyFourHoursAgo } })
      .lean()
      .sort({ createdAt: -1 })
      .exec();

    return !!claim;
  }
}
