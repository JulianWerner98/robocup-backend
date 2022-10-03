import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {SchoolService} from "./school.service";
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";
import {School} from "./school.schema";
import {UpdateSchoolDto} from "./dto";
import {FindSchoolDto} from "./dto/find-school.dto";

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

    @Get('name/:id')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getOneById(@Param() params: FindSchoolDto): Promise<School> {
        return this.schoolService.getOne(params.id);
    }

    @Get('all')
    @Roles({roles: ['realm:admin', 'realm:quali']})
    async getAll(): Promise<School[]> {
        return this.schoolService.getAll();
    }

    @Patch()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async updateSchool(@AuthenticatedUser() user: any,
                       @Body() updateSchoolDto: UpdateSchoolDto): Promise<School> {
        return this.schoolService.updateOne(updateSchoolDto, user);
    }
}
