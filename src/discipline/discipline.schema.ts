import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Discipline {
    @Prop()
    name: string;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

export type DisciplineDocument = Discipline & Document