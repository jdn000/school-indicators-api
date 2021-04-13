import { IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCalificationDto } from './create-calification.dto';


export class CreateAlumnCalificationDto extends PartialType(CreateCalificationDto) {

  @IsNumber()
  idCalification: number;


}
