import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreModule } from './pre/pre.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PreModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
