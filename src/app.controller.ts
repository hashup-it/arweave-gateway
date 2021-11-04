import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', { limits: { fileSize: 10_485_760 } }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return;
        }
        return this.appService.uploadFile(file.buffer, file.mimetype);
    }
}
