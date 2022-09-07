import {Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class School {

}

export const SchoolSchema = SchemaFactory.createForClass(School);

export type SchoolDocument = School & Document