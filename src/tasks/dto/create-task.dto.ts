import { IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../taskstatus';

export class CreateTaskDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
