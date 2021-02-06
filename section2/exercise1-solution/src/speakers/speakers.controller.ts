import { Controller, Get } from '@nestjs/common';

// Exercise:
// We want to make a request to /speakers to get the list of speakers
// but the following controller is missing a couple of items to do so.
// Fix the controller below to be able to make a request to /speakers.
//
// Solution Directory: section2/exercise1-solution

@Controller('speakers')
export class SpeakersController {

  @Get()
  getList() {
    return [
      { name: 'Amanda' }, { name: 'Ben' }
    ];
  }
}
