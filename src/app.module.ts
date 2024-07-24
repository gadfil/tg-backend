import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { BotModule } from './bot/bot.module';
import { ClaimModule } from './claim/claim.module';
import { UserModule } from './user/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'node:process';

@Module({
  imports: [ConfigModule, BotModule, ClaimModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
