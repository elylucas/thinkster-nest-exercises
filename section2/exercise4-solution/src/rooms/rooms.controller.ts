import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsRepository: RoomsRepository) { }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.roomsRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string, @Query('capacity') capacityStr?: string) {
    const capacity = parseInt(capacityStr, 10);
    return this.roomsRepository.getAll({
      name,
      capacity
    });
  }
}
