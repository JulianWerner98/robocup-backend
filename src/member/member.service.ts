import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateMemberDto, UpdateMemberDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Member, MemberDocument} from "./member.schema";
import {Model} from "mongoose";
import {Team} from "../team/team.schema";
import {StaticMethods} from "../shared";

@Injectable()
export class MemberService {
    constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
    }

    async create(createMemberDto: CreateMemberDto, user: any): Promise<Member> {
        return this.memberModel.create({...createMemberDto, createdBy: user.sub});
    }

    async findAll(user: any): Promise<Member[]> {
        if (user.realm_access.roles.includes('admin')) {
            return this.memberModel.find().exec();
        } else if (user.realm_access.roles.includes('quali')) {
            return this.memberModel
                .find()
                .populate({
                    path: 'team',
                    model: 'Team',
                    populate: [
                        {path: 'location', model: 'Location'}
                    ]
                })
                .exec()
                .then(members => members.filter((member: any) => member.team.location.name === StaticMethods.getSearchParam(user)));
        } else if (user.realm_access.roles.includes('user')) {
            return this.memberModel.find({createdBy: user.sub}).exec();
        } else {
            return []
        }
    }

    async findOne(id: string): Promise<Member> {
        const doc: MemberDocument = await this.memberModel.findOne({_id: id}).exec();
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    async updateOne(id: string, updateTravelDto: UpdateMemberDto): Promise<Member> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndUpdate({_id: id}, updateTravelDto, {new: true});
    }

    async deleteOne(id: string): Promise<Member> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndDelete({_id: id}).exec();
    }

    async findTeamMember(id: string): Promise<Member[]> {
        return this.memberModel.find({team: id}).exec();
    }

    async findMemberWithTeamAndSchoolAndLocation(): Promise<any> {
        return this.memberModel
            .find()
            .populate({
                path: 'team',
                model: 'Team',
                populate: [
                    {path: 'school', model: 'School'},
                    {path: 'location', model: 'Location'}
                ]
            })
            .exec()
    }
}