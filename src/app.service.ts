import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Arweave from 'arweave';
import { SecretService } from './secret.service';

@Injectable()
export class AppService {
    private arweave: Arweave;

    constructor(private secretService: SecretService) {
        this.arweave = new Arweave({
            host: 'arweave.net', // Hostname or IP address for a Arweave host
            port: 443, // Port
            protocol: 'https', // Network protocol http or https
            timeout: 20000, // Network request timeouts in milliseconds
            logging: false, // Enable network request logging
        });
    }

    async uploadFile(fileData: any, mimetype: string): Promise<string> {
        const arweaveJwk = await this.secretService.getArweaveJwk();

        const transaction = await this.arweave.createTransaction(
            { data: fileData },
            arweaveJwk,
        );
        transaction.addTag('Content-Type', mimetype);
        await this.arweave.transactions.sign(transaction, arweaveJwk);

        const uploader = await this.arweave.transactions.getUploader(
            transaction,
        );

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(
                `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
            );
        }
        console.log(transaction);
        return uploader.toJSON().transaction.id;
    }
}
