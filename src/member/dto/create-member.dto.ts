import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateMemberDto {

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    birth: Date;

    @IsOptional()
    @IsIn(['male','female','diverse'])
    gender?: string;
}