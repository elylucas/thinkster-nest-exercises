import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class SessionEntity {
  id: number;

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be an empty string' })
  title: string;

  @IsNumber({}, { message: 'SpeakerId must be a number' })
  speakerId: number;

  @IsOptional()
  @IsString({ message: 'Abstract must be a string' })
  @IsNotEmpty({ message: 'Abstract must not be an empty string' })
  abstract?: string;

  @IsOptional()
  @IsDate({ message: 'Time must be a date' })
  time: Date;

  @IsNumber({}, { message: 'RoomId must be a number' })
  roomId: number;

  createdAt: Date = new Date();
  createdBy: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}
