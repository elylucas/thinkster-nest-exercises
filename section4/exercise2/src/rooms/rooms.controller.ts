import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';
import { RoomEntity } from 'src/data/room.entity';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsRepository: RoomsRepository) { }

  @Get(':id')
  async get(@Param('id') id: number) {
    const room = await this.roomsRepository.get(id);
    return classToPlain(room);
  }

  @Get()
  getList(@Query('name') name: string, @Query('capacity') capacity: number) {
    return this.roomsRepository.getAll({ name, capacity });
  }
  
  @Post()
  create(@Body() room: RoomEntity) {
    room.createdBy = 'admin';
    return this.roomsRepository.create(room);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() room: RoomEntity) {
    room.createdBy = 'admin';
    return this.roomsRepository.update(id, room);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomsRepository.delete(id);
  }

}
