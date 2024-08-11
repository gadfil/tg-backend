import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('claim')
@Controller('claim')
export class ClaimController {
  // @UseGuards(AuthGuard)
  @Get()
  play(@Request() req) {}
}
