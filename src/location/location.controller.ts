import {Controller, Get} from '@nestjs/common';
import {LocationService} from "./location.service";
import { Roles} from "nest-keycloak-connect";
import {Location} from "./location.schema";

@Controller({
    version: '1',
    path: 'location'
})
export class LocationController {
    constructor(private locationService: LocationService) {
    }

    @Get()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getAll(): Promise<any> {
        return  this.locationService.findAll();
    }
}
