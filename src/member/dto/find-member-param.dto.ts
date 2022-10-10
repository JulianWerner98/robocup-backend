import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class FindMemberParamDto{
    @IsMongoId()
    id: string
}
