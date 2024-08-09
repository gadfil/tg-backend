import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.model';
import { User } from '../user/user.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly userService: UserService,
  ) {}
  async create(transactionData: Partial<Transaction>) {
    const transaction = await this.transactionModel.create(transactionData);
    await transaction.save();
    return transaction;
  }

  /**
   * @param userId
   * @param referralId  id of the user who invited the current user
   */
  async invite({
    invitedUser,
    referralUser,
  }: {
    invitedUser: User;
    referralUser: User;
  }) {
    //todo: add error handling
    if (!referralUser || !invitedUser) {
      return;
    }
    if (invitedUser.id === referralUser.id) {
      return;
    }
    if (referralUser.inviteCount === 1) {
    }
  }
}
