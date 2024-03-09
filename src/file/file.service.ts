import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import {v4 as uuid} from 'uuid';

@Injectable()
export class FileService {
    constructor(
        private readonly configService: ConfigService
    ){}

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();
        return uploadResult;
    }
}