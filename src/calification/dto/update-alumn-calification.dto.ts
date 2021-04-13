import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnCalificationDto } from './create-alumn-calification.dto';
import { IsNumber } from 'class-validator';

export class UpdateAlumnCalificationDto extends PartialType(CreateAlumnCalificationDto) {
    @IsNumber()
    id: number;
}
