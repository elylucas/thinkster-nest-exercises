import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// Exercise:
// Move the string to boolean conversion logic from the speakers controller into
// the pipe below. Make sure to test if the metatype is a Boolean and run the logic if so.
// Update the hasSpokenBefore param to getList to be a boolean.
// Once done, make a request to /speakers?hasSpokenBefore=true and make sure the request
// still returns the appropriate results.

@Injectable()
export class ConvertPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(typeof value == null) {
      return undefined;
    }

    if(metadata.metatype === Number) {
      return parseInt(value, 10);
    }

    //Todo: Add boolean convert logic here

    return value;
  }
}
