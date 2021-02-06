import { Controller, Get, Param } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';

// Exercise:
// The get method below as two errors in it that is keeping the request
// from succeeding. Fix the errors and make a request to speakers/1 to get
// back the speaker

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.get(id);
  }

  @Get()
  getList() {
    return this.speakersRepository.getAll();
  }
}
