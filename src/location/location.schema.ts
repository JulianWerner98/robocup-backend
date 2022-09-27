import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

@Schema()
export class Location {
    @Prop()
    name: string;

    @Prop()
    available: [
        {
            league: string
            discipline: [string]
        }
    ]
}

export const LocationSchema = SchemaFactory.createForClass(Location);

export type LocationDocument = Location & Document