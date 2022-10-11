import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTeamDto, UpdateTeamDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Team, TeamDocument} from "./team.schema";

@Injectable()
export class TeamService {
    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {
    }

    async create(createTeamDto: CreateTeamDto, user: any): Promise<Team> {
        return this.teamModel.create({...createTeamDto, createdBy: user.sub});
    }

    async findOne(id: string): Promise<Team> {
        const doc: TeamDocument = await this.teamModel.findOne({_id: id}).exec();
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    async findAll(user: any): Promise<Team[]> {
        if (user.realm_access.roles.includes('admin') || user.realm_access.roles.includes('quali')) {
            return this.teamModel.find().exec();
        } else if (user.realm_access.roles.includes('user')) {
            return this.teamModel.find({createdBy: user.sub}).exec();
        } else {
            return Promise.resolve([])
        }
    }

    async deleteOne(id: string): Promise<Team> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.teamModel.findOneAndDelete({_id: id}).exec();
    }

    async updateOne(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.teamModel.findOneAndUpdate({_id: id}, updateTeamDto, {new: true});
    }

    async findSchools(user: any): Promise<any> {
        let doc = await this.teamModel
            .find().select('school')
            .populate({path: 'location', model: 'Location'})
            .populate({path: 'school', model: 'School'}).exec();
        return doc
    }

    async getTeamCount(id: string): Promise<any> {
        return this.teamModel
            .find({school: id})
            .populate({path: 'location', model: 'Location'}).exec();
    }

    async findAllFromLocation(): Promise<any> {
        let doc = await this.teamModel
            .find()
            .populate({path: 'location', model: 'Location'}).exec();
        return doc
    }
}
