import {IsNotEmpty, IsString} from "class-validator";

export class UpdateSchoolDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    contactFirstname: string

    @IsString()
    @IsNotEmpty()
    contactLastname: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    street: string

    @IsString()
    @IsNotEmpty()
    number: string

    @IsString()
    @IsNotEmpty()
    postcode: string

    @IsString()
    @IsNotEmpty()
    city: string
}