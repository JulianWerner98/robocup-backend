import {Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class League {

}

export const LeagueSchema = SchemaFactory.createForClass(League);

export type LeagueDocument = League & Document