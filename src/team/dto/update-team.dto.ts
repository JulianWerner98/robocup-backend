import {IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateTeamDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Soccer', 'OnStage', 'Rescue'])
    league: string;


    @IsString()
    discipline:string;

    @IsNotEmpty()
    @IsMongoId()
    location:string;
}