import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {School, SchoolSchema} from "../school/school.schema";
import {League, LeagueSchema} from "./league.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: League.name, schema: LeagueSchema}])
  ],
  providers: [LeagueService],
  controllers: [LeagueController]
})
export class LeagueModule {}
