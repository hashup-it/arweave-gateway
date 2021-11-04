import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { SecretService } from './secret.service';
import * as multer from 'multer';

@Module({
    imports: [
        MulterModule.registerAsync({
            // imports: [ConfigModule],
            useFactory: () => {
                const storage = multer.memoryStorage();

                return {
                    storage,
                };
            },
            // inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, SecretService],
})
export class AppModule {}
