import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";


@Schema()
export class Team {
    @Prop({required: true})
    name: string;

    @Prop()
    liga: string;

    @Prop()
    disziplin: string;

    @Prop()
    standort: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    leagueRef: { type: SchemaMongoose.Types.ObjectId, ref: 'School' };
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export type TeamDocument = Team & Document