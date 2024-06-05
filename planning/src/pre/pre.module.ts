import { Module } from '@nestjs/common';
import { PreService } from './pre.service';
import { PreController } from './pre.controller';

@Module({
  controllers: [PreController],
  providers: [PreService],
  exports: [PreService],
})
export class PreModule {}
