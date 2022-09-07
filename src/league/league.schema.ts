import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class League {
    @Prop()
    name: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);

export type LeagueDocument = League & Document