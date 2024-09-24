import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
  Request,
  Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly token: string;
  constructor(private readonly authService: AuthService) {}
  @Post('sign')
  signIn(@Req() req: any,  @Body() body: any) {
    console.log('sign');
    // Extract the Authorization header from the request
    const {authData} = body
    console.log("sign req",body)

    // Check if the Authorization type is 'tma'
    if(!authData) {
      console.log('sign !tma');

      throw new BadRequestException('Invalid authorization type');
    }

    return this.authService.signIn(authData);
  }
}
