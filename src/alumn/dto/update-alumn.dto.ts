import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAlumnDto } from './create-alumn.dto';

export class UpdateAlumnDto extends PartialType(CreateAlumnDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number;


}
