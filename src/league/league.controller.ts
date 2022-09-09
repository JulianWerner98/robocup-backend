import {Controller} from '@nestjs/common';
import {LeagueService} from "./league.service";

@Controller({
version: '1',
    path: 'league'
})
export class LeagueController {
    constructor(private leagueService: LeagueService) {
    }
}
