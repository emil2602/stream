import { Injectable } from '@nestjs/common';
import Redis from "ioredis";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RedisService extends Redis {
    constructor(private readonly configService: ConfigService) {
        super(configService.get<string>('REDIS_URI'));
    }
}
