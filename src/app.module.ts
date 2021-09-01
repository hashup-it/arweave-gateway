import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.registerAsync({
            // imports: [ConfigModule],
            useFactory: async () => ({
                dest: '../uploads',
            }),
            // inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
