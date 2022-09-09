import {IsDateString, IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongodb";

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

    @IsNotEmpty()
    team: ObjectId;
}