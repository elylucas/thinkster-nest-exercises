import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';
import { RoomEntity } from 'src/data/room.entity';

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

  @Post()
  create(@Body() room: unknown) {
    const roomEntity = Object.assign(new RoomEntity(), room);
    roomEntity.createdBy = 'admin';
    return this.roomsRepository.create(roomEntity);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() room: unknown) {
    const roomEntity = Object.assign(new RoomEntity(), room);
    roomEntity.createdBy = 'admin';
    return this.roomsRepository.update(id, roomEntity);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomsRepository.delete(id);
  }

}
