import {Module} from "@nestjs/common";
import {DocumentControllerV1} from "./document.controller.v1";
import {DocumentService} from "./document.service";
import {MulterModule} from "@nestjs/platform-express";
import {ConfigService} from "@nestjs/config";
import {GridFsStorage} from "multer-gridfs-storage";

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                storage: new GridFsStorage({
                    url: configService.get<string>('MONGO_URI'),
                    file: (req, file: Express.Multer.File) => {
                        return new Promise((resolve, reject) => {
                            let fileInfos = {};
                            try {
                                fileInfos = {
                                    filename: file.originalname.trim(),
                                    metadata: {
                                        id: req.params.id,
                                        type: req.params.type
                                    }
                                }
                            } catch (error) {
                                reject(error)
                            }
                            resolve(fileInfos)
                        })
                    }
                })
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [DocumentControllerV1],
    providers: [DocumentService]
})
export class DocumentModule {

}