import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import {MongooseModule} from "@nestjs/mongoose";
import {School, SchoolSchema} from "../school/school.schema";
import {Discipline, DisciplineSchema} from "./discipline.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Discipline.name, schema: DisciplineSchema}])
  ],
  controllers: [DisciplineController],
  providers: [DisciplineService]
})
export class DisciplineModule {}
