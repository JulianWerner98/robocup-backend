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

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        return this.memberModel.create(createMemberDto);
    }

    async findAll(): Promise<Member[]> {
        return this.memberModel.find().exec();
    }

    async findOne(id: string): Promise<Member> {
        const doc: MemberDocument = await this.memberModel.findOne({_id: id}).exec();
        if(!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    async updateOne(id: string, updateTravelDto: UpdateTravelDto): Promise<Member> {
        if(!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndUpdate({_id: id}, updateTravelDto, {new: true});
    }

    async delteOne(id: string): Promise<Member> {
        if(!await this.findOne(id)) {
            throw new NotFoundException();
        }
        return this.memberModel.findOneAndDelete({_id: id}).exec();
    }

}