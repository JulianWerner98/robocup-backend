import {Controller, Delete, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors} from "@nestjs/common";
import {PhotoService} from "./photo.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {GridFSFile} from 'mongodb'
import {FindMemberParamDto, FindPhotoParamsDto} from "../dto";
import {Response} from "express";

@Controller({
    version: '1',
    path: 'member/:id/photo'
})
export class PhotoControllerV1 {
    private logger = new Logger(PhotoControllerV1.name);

    constructor(private photoService: PhotoService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async uploadPhoto(@UploadedFile() photo: Express.Multer.File): Promise<Express.Multer.File> {
        return photo;
    }

    @Get()
    async getPhotoListFromMember(@Param() params: FindMemberParamDto): Promise<GridFSFile[]> {
        this.logger.log(params.id);
        return this.photoService.findPhotosFromMember(params.id);
    }

    @Get(':pid')
    async getPhoto(@Param() params: FindPhotoParamsDto, @Res() res: Response) {
        this.logger.log("ID" + params.id);
        this.logger.log("PID" + params.pid);
        const file = await this.photoService.findPhoto(params.id, params.pid);
        return file.pipe(res);
    }

    @Delete(':pid')
    async deletePhoto(@Param() params: FindPhotoParamsDto):Promise<GridFSFile> {
        return this.photoService.deletePhoto(params.id, params.pid);
    }
}