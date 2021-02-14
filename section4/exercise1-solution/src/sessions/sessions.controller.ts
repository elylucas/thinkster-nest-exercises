import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SessionsRepository } from 'src/data/repositories/sessions.repository';
import { SessionEntity } from 'src/data/session.entity';

@Controller('sessions')
export class SessionsController {

  constructor(private sessionsRepository: SessionsRepository) { }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.sessionsRepository.get(id);
  }

  @Get()
  getList(@Query('title') title: string) {
    return this.sessionsRepository.getAll({ title });
  }

  @Post()
  create(@Body() session: SessionEntity) {
    session.createdBy = 'admin';
    return this.sessionsRepository.create(session);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() session: SessionEntity) {
    session.createdBy = 'admin';
    return this.sessionsRepository.update(id, session);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.sessionsRepository.delete(id);
  }

}
