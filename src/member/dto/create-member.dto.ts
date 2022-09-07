import {IsDateString, IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateMemberDto {

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsOptional()
    @IsDateString()
    birth: Date;

    @IsIn(['Männlich','Weiblich','Diverse'])
    gender?: string;
}