import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Coach {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    mail: string;
}

export const CoachSchema = SchemaFactory.createForClass(Coach);

export type CoachDocument = Coach & Document