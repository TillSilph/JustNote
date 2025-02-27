import { IsString, IsNotEmpty, IsDateString, IsBoolean, isMilitaryTime, IsNumber, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание обязательно' })
  description: string;

  @IsDateString({}, { message: 'Дата должна быть в формате ISO 8601' })
  date: string;

  @IsBoolean({ message: 'Дата должна быть boolean' })
  completed: boolean;

  @IsString()
  @IsOptional()
  notificationTime?: string;
  

}