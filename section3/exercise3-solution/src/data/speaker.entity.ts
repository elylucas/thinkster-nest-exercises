// Exercise:
// Add decorators from class-validator to make sure that:
// 1) There is a value provided for name, that it is a string, and it is not empty
// 2) There is a value provided for hasSpokeBefore, and that it is a boolean
// 3) IF there is a value passed in for bio, make sure its a non-empty string 
//    (hint: you will need a new decorator not discussed yet) see docs at 
//    https://github.com/typestack/class-validator#validation-decorators
// Run POST and PUT requests to /speakers, /speakers/:id to make sure the validation logic is working properly

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SpeakerEntity {
  id: number;

  @IsString({
    message: 'Name must be a string'
  })
  @IsNotEmpty({
    message: 'Name must not be an empty string'
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'Bio must be a string'
  })
  @IsNotEmpty({
    message: 'Bio must not be an empty string'
  })
  bio?: string;

  @IsBoolean({
    message: 'HasSpokenBefore must be a boolean'
  })
  hasSpokeBefore: boolean;
  createdAt: Date = new Date();
  createdBy: string;
}
