import {Module} from "@nestjs/common";
import {PhotoControllerV1} from "./photo.controller.v1";
import {PhotoService} from "./photo.service";
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
                                        memberId: req.params.id
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
    controllers: [PhotoControllerV1] ,
    providers: [PhotoService]
})
export class PhotoModule {

}