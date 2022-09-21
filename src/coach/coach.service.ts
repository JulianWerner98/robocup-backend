import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Coach, CoachDocument} from "./coach.schema";
import {CreateCoachDto, UpdateCoachDto} from "./dto";

@Injectable()
export class CoachService {
    constructor(@InjectModel(Coach.name) private coachModel: Model<CoachDocument>) {
    }

    async create(createCoachDto: CreateCoachDto, user: any) {
        return this.coachModel.create({...createCoachDto, createdBy: user.sub});
        ;
    }

    async findAll(user: any): Promise<Coach[]> {
        if (user.realm_access.roles.includes('admin')) {
            return this.coachModel.find().exec();
        } else if (user.realm_access.roles.includes('user')) {
            return this.coachModel.find({createdBy: user.sub}).exec();
        } else {
            return []
        }
    }

    async findOne(id: string): Promise<Coach> {
        const doc: CoachDocument = await this.coachModel.findOne({_id: id}).exec();
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    async updateOne(id: string, updateCoachDto: UpdateCoachDto): Promise<Coach> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.coachModel.findOneAndUpdate({_id: id}, updateCoachDto, {new: true});
    }

    async deleteOne(id: string): Promise<Coach> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.coachModel.findOneAndDelete({_id: id}).exec();
    }
}
