import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.model';

@Module({
  providers: [TransactionService],
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UserModule,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
