import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

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
  time: Date;

  @IsNumber({}, { message: 'RoomId must be a number' })
  roomId: number;

  createdAt: Date = new Date();
  createdBy: string;

  @IsIn(['beginner', 'intermediate', 'advanced'])
  level: 'beginner' | 'intermediate' | 'advanced';
}
