import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import exp from "constants";
import {Document} from "mongoose";


@Schema()
export class Member{
    @Prop({required: true})
    lastname: string;

    @Prop({required: true})
    firstname: string;

    @Prop()
    birth: Date;

    @Prop( {
        enum: ['male','female','diverse'],
        default: 'male',
    })
    gender: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

export type MemberDocument = Member & Document