import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { InitDataRequest } from './dto/user.dto';
import { AuthGuard } from '../auth/AuthGuard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Post('me')
  async getMe(@Headers() headers: any, @Body() body: InitDataRequest) {
    const user = await this.userService.me(body?.initData?.user);
    return user;
  }

  @Get()
  getHello(): string {
    return 'ok';
  }
  @UseGuards(AuthGuard)
  @Get('top')
  async getTopUsers() {
    const result = await this.userService.getTopUsers();
    console.log('top users');
    console.log('top users', result);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('friends')
  async getFriends(@Req() req, @Headers() headers: any) {
    console.log('tgUser', req?.tgUser);
    const friends = await this.userService.getFriends(req?.tgUser?.user?.id);
    console.log(friends);
    return friends;
  }
}
