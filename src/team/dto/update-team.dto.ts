import {IsIn, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateTeamDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Soccer', 'OnStage', 'Rescue'])
    liga: string;


    @IsString()
    disziplin:string;

    @IsString()
    @IsNotEmpty()
    standort:string;
}