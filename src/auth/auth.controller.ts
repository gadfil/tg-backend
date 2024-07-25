import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  authenticate(@Body() body: any) {
    const { hash, ...data } = body;

    if (!this.authService.verifyTelegramWebAppData(data, hash)) {
      throw new UnauthorizedException('Invalid hash');
    }

    // Here you might want to check if the user exists in your database
    // and create a new user if they don't

    const token = this.authService.generateToken(data.user.id);
    return { token };
  }
}
