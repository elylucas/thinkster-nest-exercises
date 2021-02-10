import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsRepository } from './data/repositories/sessions.repository';
import { APP_PIPE } from '@nestjs/core';
import { ConvertPipe } from './util/convert.pipe';

@Module({
  imports: [],
  controllers: [SpeakersController, RoomsController, SessionsController],
  providers: [
    RoomsRepository,
    SpeakersRepository,
    SessionsRepository,
    {
      provide: APP_PIPE,
      useClass: ConvertPipe
    }
  ],
})
export class AppModule { }
