import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  get(@Param('id') id: number) {
    return this.speakersRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string, @Query('hasSpokenBefore') hasSpokenBefore?: boolean) {
    return this.speakersRepository.getAll({ name, hasSpokenBefore });
  }
  
}
