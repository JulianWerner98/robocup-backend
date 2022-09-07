import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateMemberDto {
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
    @IsIn(['Männlich','Weiblich','Diverse'])
    gender?: string;
}