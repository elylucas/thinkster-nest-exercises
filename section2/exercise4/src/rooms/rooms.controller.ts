import { Controller, Get } from '@nestjs/common';
import { RoomsRepository } from 'src/data/repositories/rooms.repository';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsRepository: RoomsRepository) {}

  @Get()
  getList() {
    return this.roomsRepository.getAll();
  }
}
