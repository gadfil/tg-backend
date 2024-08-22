import { forwardRef, Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.model';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
    forwardRef(() => UserModule),
    // forwardRef(() => TransactionModule),
  ],
  providers: [ClaimService],
  controllers: [ClaimController],
  exports: [ClaimService],
})
export class ClaimModule {}
