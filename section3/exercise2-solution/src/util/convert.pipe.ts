import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

// Exercise
// Use the plainToClass method from class-transformer to convert
// the incoming value to an object of the appropriate type and return it.
// Then, update the SpeakersController to use the proper types for the entities
// Make a POST request to /speakers to verify the speaker entity is being created properly

@Injectable()
export class ConvertPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value == null) {
      return undefined;
    }

    if (metadata.metatype === Boolean) {
      let bool: boolean;
      if (value === 'true') {
        bool = true;
      } else if (value === 'false') {
        bool = false;
      }
      return bool;
    }   

    const convertedValue = plainToClass(metadata.metatype, value);
    return convertedValue;

  }
}
