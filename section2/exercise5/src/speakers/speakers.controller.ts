import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';
import { SpeakerEntity } from 'src/data/speaker.entity';

// Exercise:
// The create method down below is missing the required Nest decorators
// Add them, the make a POST request to /speakers in Postman with the following request body:
// {
// 	"name": "Billy Bob", 
// 	"hasSpokeBefore": false
// }
// Verify you get a 201 status code and that you can view the new speaker when
// making a GET request to /speakers

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  create(speaker: unknown) {
    const speakerEntity = Object.assign(new SpeakerEntity(), speaker);
    speakerEntity.createdBy = 'admin';
    return this.speakersRepository.create(speakerEntity);
  }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string, @Query('hasSpokenBefore') hasSpokenBeforeStr?: string) {
    let hasSpokenBefore: boolean;
    if (hasSpokenBeforeStr === 'true') {
      hasSpokenBefore = true;
    } else if (hasSpokenBeforeStr === 'false') {
      hasSpokenBefore = false;
    }
    return this.speakersRepository.getAll({ name, hasSpokenBefore });
  }
  
}
