import { Controller, Get } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';

// Exercise:
// While this code works, it is tightly coupling the SpeakersRepository to the controller.
// Fix that by using dependency injection instead.
//
// Solution Directory: section2/exercise2-solution

@Controller('speakers')
export class SpeakersController {

  @Get()
  getList() {
    const repo = new SpeakersRepository();
    return repo.getAll();
  }
}
