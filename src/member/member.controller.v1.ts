import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {MemberService} from "./member.service";
import {Member} from "./member.schema";
import {CreateMemberDto, UpdateMemberDto} from "./dto";
import {FindMemberParamDto} from "./dto/find-member-param.dto";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {StaticMethods} from "../shared";

@Controller({
    version: '1',
    path: 'member'
})
export class MemberControllerV1 {
    constructor(private memberService: MemberService) {
    }

    @Post()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async createMember(
        @AuthenticatedUser() user: any,
        @Body() createMemberDto: CreateMemberDto): Promise<Member> {
        return this.memberService.create(createMemberDto, user);
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getMembers(@AuthenticatedUser() user: any): Promise<Member[]> {
        let qualiLocation = StaticMethods.getSearchParam(user);
        if (qualiLocation) {
            return this.memberService.findMemberWithTeam()
                .then(members => members.filter(member => member.team && member.team.location.name === qualiLocation));
        } else {
            return this.memberService.findAll(user);
        }
    }

    @Get(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getTeamMembers(@Param() params: FindMemberParamDto): Promise<Member[]> {
        return this.memberService.findTeamMember(params.id);
    }

    @Get('institution/:id')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getMemberCountBySchoolId(@AuthenticatedUser() user: any, @Param() params: FindMemberParamDto): Promise<number> {
        let qualiLocation = StaticMethods.getSearchParam(user)
        return this.memberService
            .findMemberWithTeam()
            .then(members => members.filter(member => member.team.location.name === qualiLocation))
            .then(members => members.filter(member => member.team.school.id === params.id))
            .then(members => members.length);
    }

    @Get('teamCount/:id')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getMemberCountByTeamId(@AuthenticatedUser() user: any, @Param() params: FindMemberParamDto): Promise<number> {
        let qualiLocation = StaticMethods.getSearchParam(user);

        return this.memberService
            .findTeamMember(params.id)
            .then(members => members.length);
    }

    @Patch(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async updateMember(
        @Param() params: FindMemberParamDto,
        @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
        return this.memberService.updateOne(params.id, updateMemberDto);
    }

    @Delete(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async deleteMember(@Param() params: FindMemberParamDto): Promise<Member> {
        return this.memberService.deleteOne(params.id);
    }
}