// Exercise:
// Add decorators from class-validator to make sure that:
// 1) There is a value provided for name, that it is a string, and it is not empty
// 2) There is a value provided for hasSpokeBefore, and that it is a boolean
// 3) IF there is a value passed in for bio, make sure its a non-empty string 
//    (hint: you will need a new decorator not discussed yet) see docs at 
//    https://github.com/typestack/class-validator#validation-decorators
// Run POST and PUT requests to /speakers, /speakers/:id to make sure the validation logic is working properly

export class SpeakerEntity {
  id: number;
  name: string;
  bio?: string;
  hasSpokeBefore: boolean;
  createdAt: Date = new Date();
  createdBy: string;
}
