import {IsMongoId} from "class-validator";

export class FindSchoolDto {
    @IsMongoId()
    id: string
}