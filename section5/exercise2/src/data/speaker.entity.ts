import { Exclude } from 'class-transformer';
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

  @Exclude()
  createdAt: Date = new Date();

  @Exclude()
  createdBy: string;
}
