import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model, Types } from 'mongoose';
import { InitDataTGUser } from './dto/user.dto';
import { MeResponse } from './dto';
import { ClaimService } from '../claim/claim.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => ClaimService))
    private readonly claimService: ClaimService,
  ) {}

  async create(createUserDto: any): Promise<User> {
    console.log('UserService:create: ', createUserDto);
    const createdUser = new this.userModel(createUserDto);
    // if (createUserDto.referalId) {
    //   const referalUser = await this.findUserByTelegramId(
    //     createUserDto.referalId,
    //   );
    //   if (referalUser) {
    //     referalUser.inviteCount += 1;
    //     await referalUser.save();
    //   }
    // }
    return createdUser.save();
  }

  async findUserByTelegramId(id: number): Promise<User | null> {
    const user = await this.userModel.findOne({ id }).exec();
    return user;
  }

  /**
   * @param id telegram id
   * @param updateData
   */
  async updateUserByTelegramId(
    id: number,
    updateData: Partial<User>,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .lean()
      .exec();
  }
  async updateUser(
    _id: Types.ObjectId,
    updateData: Partial<User>,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ _id }, updateData, { new: true })
      .lean()
      .exec();
  }

  async getFriends(id: number) {
    return await this.userModel
      .find(
        { referralId: id },
        {
          id: 1,
          balance: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          level: 1,
          victory: 1,
          photo_url: 1,
        },
      )
      .sort({ level: -1, victory: -1, inviteCount: -1 })
      .lean()
      .exec();
  }
  getTopUsers() {
    return (
      this.userModel
        .find(
          {},
          {
            id: 1,
            balance: 1,
            inviteCount: 1,
            username: 1,
            firstName: 1,
            lastName: 1,
            level: 1,
            victory: 1,
            photo_url: 1,
          },
        )
        .sort({ level: -1, victory: -1, balance: -1, inviteCount: -1 })

        // .sort({ inviteCount: -1 })
        .limit(100)
        .lean()
        .exec()
    );
  }

  async me(tgUser: InitDataTGUser): Promise<MeResponse> {
    const user = await this.userModel.findOne({ id: tgUser?.id }).lean().exec();
    console.log('find user', user);

    if (!user) {
      const newUser = await this.userModel.create(tgUser);
      console.log(newUser);
      return { user: newUser, payload: { needClaim: true } };
    }
    const needClaim = await this.claimService.checkClaim(user._id);
    return { user, payload: { needClaim: true } };
  }

  async inviteUser(tgUser: InitDataTGUser, referralId: number) {
    const user = await this.userModel.findOne({ id: tgUser?.id });
    if (user) {
      // user exists
      return;
    }

    ///todo: need optimezed for performance
    const refUser = await this.userModel.findOne({ id: referralId });
    if (refUser) {
      await this.userModel.create({ ...tgUser, referralId });
      await this.userModel.updateOne(
        { _id: refUser._id },
        { $inc: { inviteCount: 1 } },
      );
    } else {
      await this.userModel.create({ ...tgUser });
    }
  }
}
