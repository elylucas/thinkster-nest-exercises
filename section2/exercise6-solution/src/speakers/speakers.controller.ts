import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';
import { SpeakerEntity } from 'src/data/speaker.entity';

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Post()
  create(@Body() speaker: unknown) {
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

  @Put(':id')
  update(@Param('id') idStr: string, @Body() speaker: unknown) {
    const id = parseInt(idStr, 10);
    const speakerEntity = Object.assign(new SpeakerEntity(), speaker);
    speakerEntity.createdBy = 'admin';
    return this.speakersRepository.update(id, speakerEntity);
  }

  @Delete(':id')
  delete(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.delete(id);
  }


}
