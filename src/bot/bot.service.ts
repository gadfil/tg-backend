import { Inject, Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
@Update()
export class BotService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    // private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly authService: AuthService,
  ) {}
  @Start()
  async onStart(@Ctx() ctx): Promise<string> {
    const me = await this.bot.telegram.getMe();
    const user = ctx.from;
    const params = ctx.startPayload;

    console.log('Пользователь нажал старт:');
    console.log('user:', user);
    console.log('Имя пользователя:', user?.username);
    console.log('ID пользователя:', user?.id);
    console.log('Переданные параметрыЖ:', params);
    // const u = await this.bot.context.
    // await this.userService.me(user);
    const { ref, code } = this.parseParam(params);
    console.log('ref', ref);
    console.log('code', code);

    if (params) {
      // const referralId = parseInt(params);

      console.log('ref by user ', ref);
      await this.authService.registrationByReferral({
        user,
        referralId: ref,
      });
    }
    return `Hey, I'm ${me.first_name}`;
  }
  @On('web_app_data')
  async onWebAppOpen(@Ctx() ctx: Context) {
    console.log('Mini App Open!!! ');
  }
}
