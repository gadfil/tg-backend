import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, TransactionModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
