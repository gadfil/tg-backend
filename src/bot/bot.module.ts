import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRoot({
      //@DevFairFrogBot
      token: '7345568240:AAHqHHmnOw6vp065NavyJfirIn4OsgXyK4s',
      include: [BotModule],
    }),
  ],

  providers: [BotService],
})
export class BotModule {}
