import {IsMongoId} from "class-validator";

export class FindPhotoParamsDto {
    @IsMongoId()
    id:string;

    @IsMongoId()
    pid:string;
}