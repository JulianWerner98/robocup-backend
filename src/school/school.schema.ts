import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class School {
    //Person
    @Prop()
    contactFirstname: string;

    @Prop()
    contactLastname: string;

    @Prop()
    email: string;

    //Institution
    @Prop()
    name: string;

    @Prop()
    street: string;

    @Prop()
    number: string;

    @Prop()
    postcode: string;

    @Prop()
    city: string;

    //Billing Address
    @Prop()
    billingName: string;

    @Prop()
    billingStreet: string;

    @Prop()
    billingNumber: string;

    @Prop()
    billingPostcode: string;

    @Prop()
    billingCity: string;

    //Meta
    @Prop()
    createdBy: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);

export type SchoolDocument = School & Document