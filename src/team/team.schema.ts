import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


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
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export type TeamDocument = Team & Document