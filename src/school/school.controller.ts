import {Body, Controller, Get, Patch} from '@nestjs/common';
import {SchoolService} from "./school.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {School} from "./school.schema";
import {UpdateMemberDto} from "../member/dto";
import {UpdateSchoolDto} from "./dto";

@Controller({
    version: '1',
    path: 'school'
})
export class SchoolController {
    constructor(private schoolService: SchoolService) {
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getOrCreate(@AuthenticatedUser() user: any): Promise<School> {
        return this.schoolService.getOrCreate(user);
    }

    @Patch()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async updateSchool(@AuthenticatedUser() user: any,
                       @Body() updateSchoolDto: UpdateSchoolDto): Promise<School> {
        return this.schoolService.updateOne(updateSchoolDto, user);
    }
}
