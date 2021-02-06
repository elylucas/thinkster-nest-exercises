import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers/speakers.controller';

@Module({
  imports: [],
  controllers: [SpeakersController],
  providers: [],
})
export class AppModule {}
