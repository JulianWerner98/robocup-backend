import {Controller} from '@nestjs/common';
import {SchoolService} from "./school.service";

@Controller({
    version: '1',
    path: 'school'
})
export class SchoolController {
    constructor(private schoolService: SchoolService) {
    }
}
