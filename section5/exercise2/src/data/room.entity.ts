import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class RoomEntity {
  id: number;

  @IsString({
    message: 'Name must be a string'
  })
  @IsNotEmpty({
    message: 'Name must not be an empty string'
  })
  name: string;

  @IsNumber({}, {
    message: 'Capacity must be a number'
  })
  @Min(1, {
    message: 'Capacity must be greater that 0'
  })
  capacity: number;

  @Exclude()
  createdAt: Date = new Date();
  @Exclude()
  createdBy: string;
}
