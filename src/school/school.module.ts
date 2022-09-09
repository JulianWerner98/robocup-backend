import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Member, MemberSchema} from "../member/member.schema";
import {School, SchoolSchema} from "./school.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: School.name, schema: SchoolSchema}])
  ],
  providers: [SchoolService],
  controllers: [SchoolController]
})
export class SchoolModule {}
