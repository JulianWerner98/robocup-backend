import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";


@Schema()
export class Team {
    @Prop()
    name: string;

    @Prop()
    league: string;

    @Prop()
    discipline: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    location: { type: SchemaMongoose.Types.ObjectId, ref: 'Location' };

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    school: { type: SchemaMongoose.Types.ObjectId, ref: 'School' };

    @Prop()
    createdBy: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export type TeamDocument = Team & Document