import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Member} from "../../member/member.schema";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Soccer','Rescue','OnStage'])
    liga:string;

    @IsString()
    disziplin:string;

    @IsString()
    @IsNotEmpty()
    standort:string;
}