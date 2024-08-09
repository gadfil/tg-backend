import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model, Types } from 'mongoose';
import { InitDataTGUser } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
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

  getTopUsers() {
    return this.userModel.find().sort({ inviteCount: -1 }).limit(100).exec();
  }

  async me(tgUser: InitDataTGUser) {
    const user = await this.userModel.findOne({ id: tgUser?.id });
    console.log('find user', user);

    if (!user) {
      const r = await this.userModel.create(tgUser);
      console.log(r);
    }
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
