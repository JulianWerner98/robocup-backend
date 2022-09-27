import {IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongodb";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Soccer','Rescue','OnStage'])
    league:string;

    @IsString()
    discipline:string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    location: ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    school: ObjectId
}