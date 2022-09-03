import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateTravelDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastname?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstname?: string;

    @IsOptional()
    birth?: Date;

    @IsOptional()
    @IsIn(['male','female','diverse'])
    gender?: string;
}