import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';
import { SpeakerEntity } from 'src/data/speaker.entity';

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Post()
  create(@Body() speaker: SpeakerEntity) {
    speaker.createdBy = 'admin';
    return this.speakersRepository.create(speaker);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.speakersRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string, @Query('hasSpokenBefore') hasSpokenBefore?: boolean) {
    return this.speakersRepository.getAll({ name, hasSpokenBefore });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() speaker: SpeakerEntity) {
    speaker.createdBy = 'admin';
    return this.speakersRepository.update(id, speaker);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.speakersRepository.delete(id);
  }
  
}
