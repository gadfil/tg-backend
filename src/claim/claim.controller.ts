import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('protected')
export class ClaimController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProtectedResource(@Request() req) {
    return { message: 'Access granted', userId: req.user.userId };
  }
}