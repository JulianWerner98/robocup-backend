import {Injectable} from '@nestjs/common';
import {Location, LocationDocument} from "./location.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {
    }

    findAll(): Promise<Location[]> {
        return this.locationModel.find().exec();
    }

    async getLocationIdByName(locationName: string): Promise<string> {
        await this.locationModel.findOne({name: locationName}).exec().then((location) => {
            return location.id;
        });
        return "";
    }
}
