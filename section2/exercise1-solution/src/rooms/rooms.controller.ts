import { Controller, Get } from '@nestjs/common';

@Controller('rooms')
export class RoomsController {

  @Get()
  getList() {
    return [
      { name: 'Grand Ballroom A' },
      { name: 'Grand Ballroom B' },
    ];
  }

}
