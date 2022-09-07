import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class School {
    @Prop({required: true})
    name: string;

    @Prop()
    street: string;

    @Prop()
    number: string;

    @Prop()
    postcode: string;

    @Prop()
    city: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);

export type SchoolDocument = School & Document