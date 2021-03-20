import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';
import { RoomEntity } from 'src/data/room.entity';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/util/getuser.decorator';
import { Roles } from 'src/util/roles.decorator';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsRepository: RoomsRepository) { }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.roomsRepository.get(id);
  }

  @Get()
  getList(@Query('name') name: string, @Query('capacity') capacity: number) {
    return this.roomsRepository.getAll({ name, capacity });
  }

  @Roles('user')
  @Post()
  create(@Body() room: RoomEntity, @GetUser() user: User) {
    room.createdBy = user.id;
    return this.roomsRepository.create(room);
  }

  @Roles('user')
  @Put(':id')
  update(@Param('id') id: number, @Body() room: RoomEntity, @GetUser() user: User) {
    room.createdBy = user.id;
    return this.roomsRepository.update(id, room);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomsRepository.delete(id);
  }

}
