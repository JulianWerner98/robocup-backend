import {Injectable, NotFoundException} from "@nestjs/common";
import {GridFSBucket, GridFSFile, GridFSBucketReadStream, ObjectId} from "mongodb";
import {InjectConnection} from "@nestjs/mongoose";
import {Connection, Schema} from "mongoose";

@Injectable()
export class PhotoService {
    private fileModel: GridFSBucket

    constructor(@InjectConnection() private connection: Connection) {
        this.fileModel = new GridFSBucket(connection.db);
    }

    async findPhotosFromMember(id: string): Promise<GridFSFile[]> {
        return this.fileModel.find({
            metadata: {memberId: id}
        }).toArray();
    }

    async findPhoto(id: string, pid: string): Promise<GridFSBucketReadStream> {
        const doc = await this.fileModel.find({
            _id: new ObjectId(pid),
        }).tryNext();
        if (!doc ||
            !(doc.metadata as any).memberId ||
            (doc.metadata as any).memberId !== id) {
            throw new NotFoundException();
        }
        return this.fileModel.openDownloadStream(doc._id);
    }

    async deletePhoto(id: string, pid: string):Promise<GridFSFile> {
        const doc = await this.fileModel.find({
            _id: new ObjectId(pid),
        }).tryNext();
        if (!doc ||
            !(doc.metadata as any).memberId ||
            (doc.metadata as any).memberId !== id) {
            throw new NotFoundException();
        }
        await this.fileModel.delete(doc._id);
        return doc;
    }
}