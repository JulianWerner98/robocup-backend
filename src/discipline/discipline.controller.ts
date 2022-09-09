import {Controller, Get} from '@nestjs/common';
import {DisciplineService} from "./discipline.service";
import {Roles} from "nest-keycloak-connect";

@Controller({
    version: '1',
    path: 'discipline'
})
export class DisciplineController {
    constructor(private disciplineService: DisciplineService) {
    }

    @Get()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getAll(): Promise<any> {
        return  this.disciplineService.getAll();
    }
}
