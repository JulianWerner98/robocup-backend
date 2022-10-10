import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CoachService} from "./coach.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {CreateCoachDto, FindCoachDto, UpdateCoachDto} from "./dto";
import {Coach} from "./coach.schema";
import {StaticMethods} from "../shared";
import {TeamService} from "../team/team.service";

@Controller({
    version: '1',
    path: 'coach'
})
export class CoachController {
    constructor(private coachService: CoachService, private teamService: TeamService) {
    }

    @Post()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async createCoach(
        @AuthenticatedUser() user: any,
        @Body() createCoachDto: CreateCoachDto): Promise<Coach> {
        return this.coachService.create(createCoachDto, user);
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getCoaches(@AuthenticatedUser() user: any): Promise<Coach[]> {
        let qualiLocation = StaticMethods.getSearchParam(user);
        if (qualiLocation) {
            let schools = []
            await this.teamService.findAllFromLocation()
                .then(teams => teams.filter(team => team.location.name === qualiLocation))
                .then(teams => {
                    teams.forEach(team => schools.push(team.school));
                    return this.coachService.findAllWithSchool(schools)
                })
            return this.coachService.findAllWithSchool(schools)
        } else {
            return this.coachService.findAll(user);
        }
    }

    @Get(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getCoach(
        @Param() params: FindCoachDto): Promise<Coach> {
        return this.coachService.findOne(params.id,);
    }

    @Patch(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async updateCoach(
        @Param() params: FindCoachDto,
        @Body() updateCoachDto: UpdateCoachDto): Promise<Coach> {
        return this.coachService.updateOne(params.id, updateCoachDto);
    }

    @Delete(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async deleteCoach(@Param() params: FindCoachDto): Promise<Coach> {
        return this.coachService.deleteOne(params.id);
    }
}
