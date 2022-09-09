import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TeamService} from "./team.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {CreateTeamDto, UpdateTeamDto} from "./dto";
import {Team} from "./team.schema";
import {FindMemberParamDto, UpdateMemberDto} from "../member/dto";
import {Member} from "../member/member.schema";

@Controller({
    version: '1',
    path: 'team'
})
export class TeamControllerV1 {
    constructor(private teamService: TeamService) {
    }

    @Post()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async createTeam(
        @AuthenticatedUser() user: any,
        @Body() createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamService.create(createTeamDto, user);
    }

    @Get()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getAll(@AuthenticatedUser() user: any): Promise<Team[]> {
        return this.teamService.findAll(user);
    }

    @Get(':id')
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getOne(@Param() params: FindMemberParamDto): Promise<Team> {
        return this.teamService.findOne(params.id);
    }

    @Delete(':id')
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async deleteMember(@Param() params: FindMemberParamDto): Promise<Team> {
        return this.teamService.deleteOne(params.id);
    }

    @Patch(':id')
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async updateMember(
        @Param() params: FindMemberParamDto,
        @Body() updateTeamDto: UpdateTeamDto): Promise<Team> {
        return this.teamService.updateOne(params.id, updateTeamDto);
    }
}
