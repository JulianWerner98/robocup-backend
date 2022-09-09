import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CoachService} from "./coach.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {CreateCoachDto, FindCoachDto, UpdateCoachDto} from "./dto";
import {Coach} from "./coach.schema";

@Controller({
    version: '1',
    path: 'coach'
})
export class CoachController {
    constructor(private coachService: CoachService) {
    }

    @Post()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async createCoach(
        @AuthenticatedUser() user: any,
        @Body() createCoachDto: CreateCoachDto): Promise<Coach> {
        return this.coachService.create(createCoachDto, user);
    }

    @Get()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getMembers(@AuthenticatedUser() user: any): Promise<Coach[]> {
        return this.coachService.findAll(user);
    }

    @Patch(':id')
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async updateMember(
        @Param() params: FindCoachDto,
        @Body() updateCoachDto: UpdateCoachDto): Promise<Coach> {
        return this.coachService.updateOne(params.id, updateCoachDto);
    }

    @Delete(':id')
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async deleteMember(@Param() params: FindCoachDto): Promise<Coach> {
        return this.coachService.deleteOne(params.id);
    }
}
