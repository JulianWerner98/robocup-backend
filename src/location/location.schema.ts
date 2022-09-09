import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

@Schema()
export class Location {
    @Prop()
    name: string;

    @Prop()
    leagueRef: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Discipline' }];
}

export const LocationSchema = SchemaFactory.createForClass(Location);

export type LocationDocument = Location & Document