import { Injectable } from '@nestjs/common';

interface ISecrets {
    arweaveKey: {
        kty: 'RSA';
        n: string;
        e: string;
        d: string;
        p: string;
        q: string;
        dp: string;
        dq: string;
        qi: string;
    };
}

@Injectable()
export class SecretService {
    #config: ISecrets = {} as any;

    constructor() {
        if (!process.env.ARWEAVE_KEY) {
            throw new Error('Missing env variable: ARWEAVE_KEY');
        }
        this.#config.arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
    }

    getArweaveJwk() {
        return this.#config.arweaveKey;
    }
}
