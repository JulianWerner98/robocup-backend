import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateSchoolDto {

    //Person
    @IsString()
    @IsNotEmpty()
    contactFirstname: string

    @IsString()
    @IsNotEmpty()
    contactLastname: string

    @IsString()
    @IsNotEmpty()
    email: string

    //Institution
    @IsString()
    @IsNotEmpty()
    name: string

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

    //Billing Address
    @IsOptional()
    billingName: string

    @IsOptional()
    billingStreet: string

    @IsOptional()
    billingNumber: string

    @IsOptional()
    billingPostcode: string

    @IsOptional()
    billingCity: string
}