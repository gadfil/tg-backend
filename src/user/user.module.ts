import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { ClaimModule } from '../claim/claim.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => ClaimModule),
  ],

  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
