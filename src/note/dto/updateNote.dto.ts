import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Описание обязательно' })
  description: string;

  @IsOptional()
  @IsDateString({}, { message: 'Дата должна быть в формате ISO 8601' })
  date: string;

  @IsOptional()
  @IsBoolean({ message: 'Дата должна быть boolean' })
  completed: boolean;

  @IsString()
  @IsOptional()
  notificationTime?: string;
}
