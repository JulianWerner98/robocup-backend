import {Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Coach {
}

export const CoachSchema = SchemaFactory.createForClass(Coach);

export type CoachDocument = Coach & Document