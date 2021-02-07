import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';

@Module({
  imports: [],
  controllers: [SpeakersController, RoomsController],
  providers: [RoomsRepository, SpeakersRepository],
})
export class AppModule {}
