import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class FindDocumentParamsDto {
    @IsMongoId()
    id:string;

    @IsNotEmpty()
    @IsString()
    type:string;

    @IsMongoId()
    did:string;
}