import { Controller, Get, Param } from '@nestjs/common';
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
  getList() {
    return this.roomsRepository.getAll();
  }
}
