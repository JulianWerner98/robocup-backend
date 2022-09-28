import {IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongodb";

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

    @IsOptional()
    @IsMongoId()
    team?: ObjectId;
}