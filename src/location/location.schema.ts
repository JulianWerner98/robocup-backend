import {Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Location {
}

export const LocationSchema = SchemaFactory.createForClass(Location);

export type LocationDocument = Location & Document