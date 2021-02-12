import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, UsePipes } from '@nestjs/common';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';
import { SessionEntity } from 'src/data/session.entity';
import { EntityNotFoundException } from 'src/data/repositories/entity-not-found.exception';

@Injectable()
export class SessionValidatorPipe implements PipeTransform {

  constructor(private roomsRepository: RoomsRepository, private speakersRepository: SpeakersRepository) { }

  async transform(value: any, metadata: ArgumentMetadata) {

    if (metadata.metatype === SessionEntity) {
      const errors: string[] = [];
      try {
        await this.roomsRepository.get(value.roomId);
      } catch (ex) {
        if (ex instanceof EntityNotFoundException) {
          errors.push(ex.message);
        } else { throw ex; }
      }

      try {
        await this.speakersRepository.get(value.speakerId);
      } catch (ex) {
        if (ex instanceof EntityNotFoundException) {
          errors.push(ex.message);
        } else { throw ex; }
      }

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }

    return value;
  }
}
