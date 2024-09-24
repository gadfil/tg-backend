import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClaimService } from './claim.service';
import { AuthGuard } from '../auth/AuthGuard';
@ApiTags('claim')
@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  /**
   * claim daily reward
   * @param req
   */
  @UseGuards(AuthGuard)
  @Post('/daily')
  async claim(@Request() req) {
    try {
      const claim = await this.claimService.getDailyClaim(
        req?.tgUser?.user?.id,
      );
      return { claim };
    } catch (e) {
      return { error: e.message };
    }
  }
}
