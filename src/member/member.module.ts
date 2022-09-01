import {Module} from "@nestjs/common";
import {MemberControllerV1} from "./member.controller.v1";
import {MemberService} from "./member.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Member, MemberSchema} from "./member.schema";
import {PhotoModule} from "./photos/photo.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Member.name, schema: MemberSchema}]),
        PhotoModule
    ],
    controllers: [MemberControllerV1],
    providers: [MemberService]
})

export class MemberModule {
}