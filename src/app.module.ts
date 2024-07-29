import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { ClaimModule } from './claim/claim.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    ClaimModule,
    UserModule,
    AuthModule,
    /// todo: should crate a database module and settings
    MongooseModule.forRoot(process.env.MONGO_URL, {}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
