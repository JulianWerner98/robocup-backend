import { Controller } from '@nestjs/common';
import {TeamService} from "../team/team.service";
import {LocationService} from "./location.service";

@Controller({
    version: '1',
    path: 'location'
})
export class LocationController {
    constructor(private locationService: LocationService) {
    }
}
