import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongodb";

export class CreateCoachDto {
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    mail: string;

    @IsNotEmpty()
    school: ObjectId
}