import { Module } from '@nestjs/common';
import { RoomsController } from './rooms/rooms.controller';
import { SpeakersController } from './speakers/speakers.controller';

@Module({
  imports: [],
  controllers: [RoomsController, SpeakersController],
  providers: [],
})
export class AppModule {}
