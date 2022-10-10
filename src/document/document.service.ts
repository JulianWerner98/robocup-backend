import {Injectable, NotFoundException} from "@nestjs/common";
import {GridFSBucket, GridFSBucketReadStream, GridFSFile, ObjectId} from "mongodb";
import {InjectConnection} from "@nestjs/mongoose";
import {Connection} from "mongoose";

@Injectable()
export class DocumentService {
    private fileModel: GridFSBucket

    constructor(@InjectConnection() private connection: Connection) {
        this.fileModel = new GridFSBucket(connection.db);
    }

    async findDocuments(type: string, id: string): Promise<GridFSFile[]> {
        return this.fileModel.find({
            metadata: {id: id, type: type}
        }).toArray();
    }

    async findDocument(type:string, id: string, pid: string): Promise<GridFSBucketReadStream> {
        const doc = await this.fileModel.find({
            _id: new ObjectId(pid),
        }).tryNext();
        if (!doc ||
            !(doc.metadata as any).id ||
            !(doc.metadata as any).type ||
            (doc.metadata as any).id !== id ||
            (doc.metadata as any).type !== type) {
            throw new NotFoundException();
        }
        return this.fileModel.openDownloadStream(doc._id);
    }

    async deleteDocument(type: string, id: string, pid: string):Promise<GridFSFile> {
        const doc = await this.fileModel.find({
            _id: new ObjectId(pid),
        }).tryNext();
        if (!doc ||
            !(doc.metadata as any).id ||
            !(doc.metadata as any).type ||
            (doc.metadata as any).id !== id ||
            (doc.metadata as any).type !== type) {
            throw new NotFoundException();
        }
        await this.fileModel.delete(doc._id);
        return doc;
    }
}