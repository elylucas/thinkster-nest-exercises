import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SessionsRepository } from 'src/data/repositories/sessions.repository';
import { SessionEntity } from 'src/data/session.entity';

@Controller('sessions')
export class SessionsController {

  constructor(private sessionsRepository: SessionsRepository) { }
  
  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.sessionsRepository.get(id);
  }

  @Get()
  getList(@Query('title') title: string) {
    return this.sessionsRepository.getAll({ title });
  }

  @Post()
  create(@Body() session: unknown) {
    const sessionEntity = Object.assign(new SessionEntity(), session);
    sessionEntity.createdBy = 'admin';
    return this.sessionsRepository.create(sessionEntity);
  }

  @Put(':id')
  update(@Param('id') idStr: string, @Body() session: unknown) {
    const id = parseInt(idStr, 10);
    const sessionEntity = Object.assign(new SessionEntity(), session);
    sessionEntity.createdBy = 'admin';
    return this.sessionsRepository.update(id, sessionEntity);
  }

  @Delete(':id')
  delete(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.sessionsRepository.delete(id);
  }


}
