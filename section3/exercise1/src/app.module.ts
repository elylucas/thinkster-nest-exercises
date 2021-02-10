import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsRepository } from './data/repositories/sessions.repository';

@Module({
  imports: [],
  controllers: [SpeakersController, RoomsController, SessionsController],
  providers: [RoomsRepository, SpeakersRepository, SessionsRepository],
})
export class AppModule {}
