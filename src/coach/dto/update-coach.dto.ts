import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongodb";

export class UpdateCoachDto {
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

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    school: ObjectId
}