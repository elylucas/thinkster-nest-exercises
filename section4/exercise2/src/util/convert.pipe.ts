import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

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
