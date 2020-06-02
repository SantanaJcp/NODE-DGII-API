import * as fs from 'fs';
import { parse } from 'dotenv';

export class EnvConfig {
    #envConfig;

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../../.env';
            const existPath = fs.existsSync(envFilePath);
            if (!existPath) {
                process.exit(0);
            }
            this.#envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.#envConfig = {
                PORT: process.env.PORT,
                DGII_BASE_URL: process.env.DGII_BASE_URL
            };
        }
    }
     get(propName) {
        return this.#envConfig[propName];
    }
}
