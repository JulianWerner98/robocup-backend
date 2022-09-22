import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Schema as SchemaMongoose} from "mongoose";


@Schema()
export class Member {
    @Prop({required: true})
    lastname: string;

    @Prop({required: true})
    firstname: string;

    @Prop()
    birth: Date;

    @Prop()
    gender: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    team: { type: SchemaMongoose.Types.ObjectId, ref: 'Team' };

    @Prop()
    createdBy: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

export type MemberDocument = Member & Document