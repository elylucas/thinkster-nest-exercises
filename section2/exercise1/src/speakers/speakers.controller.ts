import { Controller } from '@nestjs/common';

// Exercise:
// We want to make a request to /speakers to get the list of speakers
// but the following controller is missing a couple of items to do so.
// Fix the controller below to be able to make a request to /speakers.
//
// Solution Directory: section2/exercise1-solution

@Controller('')
export class SpeakersController {
  getList() {
    return [
      { name: 'Amanda' }, { name: 'Ben' }
    ];
  }
}
