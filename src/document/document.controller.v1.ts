import {Controller, Delete, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors} from "@nestjs/common";
import {DocumentService} from "./document.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {GridFSFile} from 'mongodb'
import {FindDocumentParamsDto, FindMemberParamDto} from "../member/dto";
import {Response} from "express";
import {Roles} from "nest-keycloak-connect";
import {FindDocumentsParams} from "./dto/find-documents-params.dto";

@Controller({
    version: '1',
    path: 'document/:type/:id'
})
export class DocumentControllerV1 {
    private logger = new Logger(DocumentControllerV1.name);

    constructor(private documentService: DocumentService) {
    }

    @Post()
    @Roles({roles: ['realm:admin', 'realm:user']})
    @UseInterceptors(FileInterceptor('document'))
    async uploadDocument(@UploadedFile() document: Express.Multer.File): Promise<Express.Multer.File> {
        return document;
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getDocumentList(@Param() params: FindDocumentsParams): Promise<GridFSFile[]> {
        return this.documentService.findDocuments(params.type, params.id);
    }

    @Get(':did')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async getDocument(@Param() params: FindDocumentParamsDto, @Res() res: Response) {
        const file = await this.documentService.findDocument(params.type, params.id, params.did);
        return file.pipe(res);
    }

    @Delete(':did')
    @Roles({roles: ['realm:admin', 'realm:user']})
    async deleteDocument(@Param() params: FindDocumentParamsDto): Promise<GridFSFile> {
        return this.documentService.deleteDocument(params.type, params.id, params.did);
    }
}