import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InfoService {

    private CTIMS_API_VERSION = process.env.CTIMS_API_VERSION;

    private readonly logger = new Logger(InfoService.name, { timestamp: true });

    getAppInfo() {
        let info = {
            'version': this.CTIMS_API_VERSION,
        }
        return info;
    }
}
