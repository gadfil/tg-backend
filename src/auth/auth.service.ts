import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { calculateInviteRewards, Rewards } from '../config/config';
import { TransactionType } from '../transaction/transaction.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private transactionService: TransactionService,
  ) {}

  /**
   * @param userId
   * @param referralId  id of the user who invited the current user
   */
  async registrationByReferral({
    user,
    referralId,
  }: {
    user: any;
    referralId: number;
  }) {
    const userId = user?.id;
    console.log('referralId', referralId, 'userId', userId);
    if (!userId) {
      return;
    }
    if (!referralId) {
      await this.userService.create({ ...user });
      return;
    }
    // check if user exists
    const userExist = await this.userService.findUserByTelegramId(userId);
    if (userExist) {
      console.log('UserExist', userExist);
      return;
    }
    const referralUser =
      await this.userService.findUserByTelegramId(referralId);
    // if referralUser does not exist, just create user
    console.log('referralUser', referralUser);

    if (!referralUser || referralId == userId) {
      await this.userService.create({ ...user });
      return;
    }

    // if referralUser exists, increase inviteCount and create user
    const newUser = await this.userService.create({
      ...user,
      balance: Rewards.registrationReward.coin,
      energy: Rewards.registrationReward.energy,
      dailyEnergy: Rewards.registrationReward.dailyEnergy,
    });
    await this.transactionService.create({
      user: newUser,
      transactionType: TransactionType.RegistrationByReferralLink,
      ...Rewards.registrationReward,
    });

    const _id = referralUser._id;
    const reward = calculateInviteRewards(referralUser.inviteCount);
    console.log('reward', reward);
    const update =
      reward.coin > 0
        ? {
            inviteCount: referralUser.inviteCount + 1,
            balance: referralUser.balance + reward?.coin,
            energy: referralUser.energy + reward?.energy,
            dailyEnergy: referralUser.dailyEnergy + reward?.dailyEnergy,
          }
        : { inviteCount: referralUser.inviteCount + 1 };
    console.log('update', update);

    await this.userService.updateUser(_id, {
      ...update,
    });
    // if refferal hase rewards
    if (reward.coin > 0) {
      const type = {
        1: TransactionType.FirstReferral,
        3: TransactionType.Referral3,
        5: TransactionType.Referral5,
        10: TransactionType.Referral10,
      };
      await this.transactionService.create({
        user: referralUser,
        transactionType: type[update.inviteCount],
        ...Rewards.registrationReward,
      });
    }
  }
}
