import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

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

  async findUserByTelegramId(telegramId: string): Promise<User | null> {
    return this.userModel.findOne({ telegramId }).exec();
  }
  async updateUser(
    telegramId: number,
    updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ telegramId }, updateData, { new: true })
      .exec();
  }
  async findUsersByReferalId(
    referalId: number,
    page: number,
    limit: number,
  ): Promise<User[]> {
    const skip = (page - 1) * limit;
    return this.userModel.find({ referalId }).skip(skip).limit(limit).exec();
  }

  getTopUsers() {
    return this.userModel.find().sort({ inviteCount: -1 }).limit(100).exec();
  }
}
