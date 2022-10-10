import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TeamService} from "./team.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {CreateTeamDto, UpdateTeamDto} from "./dto";
import {Team} from "./team.schema";
import {FindMemberParamDto} from "../member/dto";
import {School} from "../school/school.schema";
import {StaticMethods} from "../shared";

@Controller({
    version: '1',
    path: 'team'
})
export class TeamControllerV1 {
    constructor(private teamService: TeamService) {
    }

    @Post()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async createTeam(
        @AuthenticatedUser() user: any,
        @Body() createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamService.create(createTeamDto, user);
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getAll(@AuthenticatedUser() user: any): Promise<Team[]> {
        let doc;
        let qualiLocation = StaticMethods.getSearchParam(user);
        if (qualiLocation) {
            doc = this.teamService.findAllFromLocation()
                .then((teams) => teams.filter(team => team.location.name === qualiLocation))

        } else {
            doc = this.teamService.findAll(user)
        }

        return doc;
    }

    @Get('overview')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getOverview(@AuthenticatedUser() user: any): Promise<any> {
        return this.teamService.findAll(user)
            .then(teams => {
                let disciplines: string[] = []
                let teamNames: string[] = []
                teams.forEach(team => {
                    if(!disciplines.includes(team.discipline)) disciplines.push(team.discipline);
                    teamNames.push(team.name)
                })
                return {
                    teamCount: teams.length,
                    teams: teamNames.sort(),
                    disciplines: disciplines.sort()
                }
            })
    }

    @Get('institution')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getSchools(@AuthenticatedUser() user: any): Promise<School[]> {
        let qualiLocation = StaticMethods.getSearchParam(user);

        let doc = this.teamService.findSchools(user)
            .then((teams) => teams.filter(team => team.location.name === qualiLocation))
            .then((teams) => teams.map((team => team.school)))
            .then((institutions) => {
                let result: School[] = [];
                institutions.forEach((institution) => {
                    if (!result.includes(institution)) {
                        result.push(institution);
                    }
                })
                return result;
            });
        return doc;
    }

    @Get('institution/:id')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getTeamCount(@AuthenticatedUser() user: any, @Param() params: FindMemberParamDto): Promise<number> {
        let qualiLocation = StaticMethods.getSearchParam(user);

        return this.teamService.getMemberCount(params.id)
            .then((teams) => teams.filter(team => team.location.name === qualiLocation))
            .then((teams) => teams.length);
    }

    @Get(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getOne(@Param() params: FindMemberParamDto): Promise<Team> {
        return this.teamService.findOne(params.id);
    }

    @Delete(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async deleteMember(@Param() params: FindMemberParamDto): Promise<Team> {
        return this.teamService.deleteOne(params.id);
    }

    @Patch(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async updateMember(
        @Param() params: FindMemberParamDto,
        @Body() updateTeamDto: UpdateTeamDto): Promise<Team> {
        return this.teamService.updateOne(params.id, updateTeamDto);
    }
}
