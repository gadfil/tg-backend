import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TransactionModule } from '../transaction/transaction.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      //@DevFairFrogBot
      token: '7345568240:AAHqHHmnOw6vp065NavyJfirIn4OsgXyK4s',
      include: [BotModule],
    }),
    // UserModule,
    TransactionModule,
    AuthModule,
  ],

  providers: [BotService],
})
export class BotModule {}
