import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('me')
  getMe(@Headers() headers: any, @Body() initData: any) {
    console.log('initData', initData);
    console.log('headers', headers);
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
