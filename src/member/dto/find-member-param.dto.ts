import {IsMongoId} from "class-validator";

export class FindMemberParamDto{
    @IsMongoId()
    id: string
}
