import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
@Injectable()
@Update()
export class BotService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}
  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    console.log(me);
    return `Hey, I'm ${me.first_name}`;
  }
}
