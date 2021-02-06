import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';

@Module({
  imports: [],
  controllers: [SpeakersController, RoomsController],
  providers: [RoomsRepository],
})
export class AppModule {}
