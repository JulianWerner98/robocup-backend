import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {School, SchoolSchema} from "../school/school.schema";
import {Coach, CoachSchema} from "./coach.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Coach.name, schema: CoachSchema}])
  ],
  providers: [CoachService],
  controllers: [CoachController]
})
export class CoachModule {}
