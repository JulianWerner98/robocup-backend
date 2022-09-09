import {Injectable} from '@nestjs/common';
import {Location, LocationDocument} from "./location.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {
    }

    findAll(): Promise<any> {
        return this.locationModel.find().populate('disciplineRef').exec();
    }
}
