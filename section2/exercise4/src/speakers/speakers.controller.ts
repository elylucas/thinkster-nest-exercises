import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';

// Exercise:
// Update the getAll method to take a query param named hasSpokenBeforeStr,
// which will need to be converted to a boolean value to pass into the repository.
// Make a requests to:
// /speakers?hasSpokenBefore=true and
// /speakers/hasSpokenBefore=false
// and make sure the appropriate speakers get returned

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string) {
    return this.speakersRepository.getAll({ name });
  }
}
