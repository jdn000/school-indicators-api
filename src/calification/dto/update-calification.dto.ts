import { PartialType } from '@nestjs/mapped-types';
import { CreateCalificationDto } from './create-calification.dto';
import { IsNumber } from 'class-validator';

export class UpdateCalificationDto extends PartialType(CreateCalificationDto) {
    @IsNumber()
    id: number;
}
