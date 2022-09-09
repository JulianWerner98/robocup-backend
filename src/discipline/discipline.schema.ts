import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

@Schema()
export class Discipline {
    @Prop()
    name: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    leagueRef: { type: SchemaMongoose.Types.ObjectId, ref: 'League' };
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

export type DisciplineDocument = Discipline & Document