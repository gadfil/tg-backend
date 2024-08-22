import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Claim, ClaimDocument } from './claim.model';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,

    // private readonly transactionService: TransactionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getClaim(id: number) {
    // check if user has already claimed
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
}
