import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClaimService } from './claim.service';
import { AuthGuard } from '../auth/AuthGuard';
@ApiTags('claim')
@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}
  @UseGuards(AuthGuard)
  @Post()
  async claim(@Request() req) {
    const claim = await this.claimService.getClaim(req?.tgUser?.user?.id);
    return { claim };
  }
}
