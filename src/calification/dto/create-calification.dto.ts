import { IsOptional, IsNumber, IsBoolean } from 'class-validator';


export class CreateCalificationDto {

    @IsOptional()
    @IsNumber()
    subjectId: number;

    @IsOptional()
    @IsBoolean()
    isCummulative: boolean;

    @IsOptional()
    @IsNumber()
    objectiveId: number;

    @IsOptional()
    @IsNumber()
    evaluationNumber: number;

    @IsOptional()
    @IsNumber()
    gradeId: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    indicators: number[];

    @IsOptional()
    @IsNumber()
    alumnId: number;

    @IsOptional()
    @IsNumber()
    value: number;

    @IsOptional()
    @IsNumber()
    calificationId: number;

    @IsOptional()
    @IsNumber()
    semesterId: number;

}
