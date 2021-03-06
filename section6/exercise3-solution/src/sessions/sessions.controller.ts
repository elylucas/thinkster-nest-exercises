import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SessionsRepository } from 'src/data/repositories/sessions.repository';
import { SessionEntity } from 'src/data/session.entity';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/util/getuser.decorator';
import { Roles } from 'src/util/roles.decorator';

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

  @Roles('user')
  @Post()
  create(@Body() session: SessionEntity, @GetUser() user: User) {
    session.createdBy = user.id;
    return this.sessionsRepository.create(session);
  }

  @Roles('user')
  @Put(':id')
  update(@Param('id') id: number, @Body() session: SessionEntity, @GetUser() user: User) {
    session.createdBy = user.id;
    return this.sessionsRepository.update(id, session);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.sessionsRepository.delete(id);
  }

}
