import { MaxLength, IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { CreateAlumnCalificationDto } from './create-alumn-calification.dto';
import { CreateCalificationDto } from './create-calification.dto';
import { Type } from 'class-transformer';

export class CreateBatchCalificationsDto {

    @ValidateNested()
    califications: CreateAlumnCalificationDto[];
    @Type(() => CreateCalificationDto)
    mainCalification: CreateCalificationDto;

    @IsNumber({}, { each: true })
    indicators: number[];

}
