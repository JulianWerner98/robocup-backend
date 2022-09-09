import {Module} from '@nestjs/common';
import {TeamControllerV1} from './team.controller.v1';
import {MongooseModule} from "@nestjs/mongoose";
import {Team, TeamSchema} from "./team.schema";
import {TeamService} from "./team.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Team.name, schema: TeamSchema}]),
    ],
    controllers: [TeamControllerV1],
    providers: [TeamService]
})
export class TeamModule {
}
