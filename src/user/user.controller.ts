import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  validate,
  parse,
  type InitDataParsed,
} from '@telegram-apps/init-data-node';
import { InitDataRequest } from './user.dto';
import { AuthGuard } from '../auth/AuthGuard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('me')
  getMe(@Headers() headers: any, @Body() body: InitDataRequest) {
    console.log('------------------');
    console.log(body);
    console.log('headers', headers);

    this.userService.me(body?.initData?.user);
  }

  @Get()
  getHello(): string {
    return 'ok';
  }

  @Get('top')
  getTopUsers() {
    return this.userService.getTopUsers();
  }
}
