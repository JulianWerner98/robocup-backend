import {Get, Injectable, NotFoundException} from "@nestjs/common";
import {CreateMemberDto, UpdateTravelDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Member, MemberDocument} from "./member.schema";
import {Model} from "mongoose";
import {find} from "rxjs";

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
        } else if (user.reeal_access.roles.includes('user')) {
            return this.memberModel.find({createdBy: user.sub}).exec();
        } else {
            const member = new Member();
            member.firstname ="No";
            return [member]
        }
    }

    async findOne(id: string): Promise<Member> {
        const doc: MemberDocument = await this.memberModel.findOne({_id: id}).exec();
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    async updateOne(id: string, updateTravelDto: UpdateTravelDto): Promise<Member> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndUpdate({_id: id}, updateTravelDto, {new: true});
    }

    async delteOne(id: string): Promise<Member> {
        if (!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndDelete({_id: id}).exec();
    }

}