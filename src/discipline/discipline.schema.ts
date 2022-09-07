import {Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Discipline {

}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

export type DisciplineDocument = Discipline & Document