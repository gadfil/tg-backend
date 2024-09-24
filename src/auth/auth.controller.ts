import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
  Request,
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
  signIn(@Req() req: any) {
    // Extract the Authorization header from the request
    const [authType, authData = ''] = (req.header('authorization') || '').split(
      ' ',
    );

    // Check if the Authorization type is 'tma'
    if (authType !== 'tma') {
      throw new BadRequestException('Invalid authorization type');
    }

    return this.authService.signIn(authType);
  }
}
