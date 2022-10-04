import {Module} from '@nestjs/common';
import {CoachService} from './coach.service';
import {CoachController} from './coach.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Coach, CoachSchema} from "./coach.schema";
import {TeamModule} from "../team";
import {TeamService} from "../team/team.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Coach.name, schema: CoachSchema}]),
        TeamModule
    ],
    providers: [CoachService],
    controllers: [CoachController]
})
export class CoachModule {
}
