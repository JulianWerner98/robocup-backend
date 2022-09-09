import {Get, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Discipline, DisciplineDocument} from "./discipline.schema";
import {Roles} from "nest-keycloak-connect";

@Injectable()
export class DisciplineService {
    constructor(@InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>) {
    }

    @Get()
    @Roles( {roles: ['realm:admin', 'realm:user']})
    async getAll(): Promise<any> {
        return  this.disciplineModel.findOne().populate('leagueRef').exec();
    }
}
