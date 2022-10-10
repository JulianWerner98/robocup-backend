import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class FindDocumentsParams {
    @IsMongoId()
    id:string;

    @IsNotEmpty()
    @IsString()
    type:string;
}