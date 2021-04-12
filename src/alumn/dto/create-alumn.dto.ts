import { MaxLength, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAlumnDto {

    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    run: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    names: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    secondSurname: string;

    @IsNumber()
    @IsNotEmpty()
    @MaxLength(20)
    gradeId: number;


}

