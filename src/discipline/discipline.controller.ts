import {Controller} from '@nestjs/common';
import {DisciplineService} from "./discipline.service";

@Controller({
    version: '1',
    path: 'discipline'
})
export class DisciplineController {
    constructor(private disciplineService: DisciplineService) {
    }
}
