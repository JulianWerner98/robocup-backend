import {Controller} from '@nestjs/common';
import {CoachService} from "./coach.service";

@Controller({
    version: '1',
    path: 'coach'
})
export class CoachController {
    constructor(private coachService: CoachService) {
    }
}
