import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

@Schema()
export class Coach {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    mail: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    school: { type: SchemaMongoose.Types.ObjectId, ref: 'School' };
}

export const CoachSchema = SchemaFactory.createForClass(Coach);

export type CoachDocument = Coach & Document