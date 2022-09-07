import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTeamDto, UpdateTeamDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Team, TeamDocument} from "./team.schema";
import {Member, MemberDocument} from "../member/member.schema";

@Injectable()
export class TeamService {
    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {
    }

    create(createTeamDto: CreateTeamDto, user: any):Promise<Team> {
        return this.teamModel.create({...createTeamDto, createdBy: user.sub});
    }

    async findOne(id: string): Promise<Team> {
        const doc: TeamDocument = await this.teamModel.findOne({_id: id}).exec();
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    findAll(user: any) {
        if (user.realm_access.roles.includes('admin')) {
            return this.teamModel.find().exec();
        } else if (user.reeal_access.roles.includes('user')) {
            return this.teamModel.find({createdBy: user.sub}).exec();
        } else {
            return []
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
}
