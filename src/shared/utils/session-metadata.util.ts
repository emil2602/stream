import { Request } from "express";
import {SessionMetadata} from "@/src/shared/types/session-metadata";
import {IS_DEV_ENV} from "@/src/shared/utils/is-dev.util";
import DeviceDetector = require("device-detector-js");
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function getSessionMetaData(req: Request, userAgent: string): SessionMetadata {
    const ip = IS_DEV_ENV ? '173.166.164.121' : Array.isArray(req.headers['cf-connecting-ip'])
    ? req.headers['cf-connecting-ip'][0]
        : req.headers['cf-connecting-ip'] || (typeof req.headers['x-forwarded-for'] === 'string'
            ? req.headers['x-forwarded-for'].split(',')[0]
                : req.ip)

    const location = lookup(ip)
    const device = new DeviceDetector().parse(userAgent)

    return {
        location: {
            country: countries.getName(location.country, 'en') || 'Unknown',
            city: location.city,
            lat: location.ll[0] || 0,
            lng: location.ll[1] || 0
        },
        device: {
            browser: device.client.name,
            os: device.os.name,
            type: device.device.type
        },
        ip
    }
}