import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';

@Module({
  imports: [],
  controllers: [ClaimController],
})
export class ClaimModule {}
