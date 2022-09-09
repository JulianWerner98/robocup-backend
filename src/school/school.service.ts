import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {School, SchoolDocument} from "./school.schema";
import {UpdateSchoolDto} from "./dto";

@Injectable()
export class SchoolService {
    constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {
    }

    async getOrCreate(user: any): Promise<School> {
        const doc: SchoolDocument = await this.schoolModel.findOne({createdBy: user.sub}).exec();
        if(!doc) {
            return this.schoolModel.create({createdBy: user.sub});
        }
        return doc;
    }

    async updateOne(updateSchoolDto: UpdateSchoolDto, user: any): Promise<School> {
        return this.schoolModel.findOneAndUpdate({createdBy: user.sub}, updateSchoolDto, {new: true});
    }
}
