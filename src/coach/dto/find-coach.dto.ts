import {IsMongoId} from "class-validator";

export class FindCoachDto {
    @IsMongoId()
    id: string
}