import {IS_EMAIL, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateSchoolDto {

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
    @IsEmail()
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