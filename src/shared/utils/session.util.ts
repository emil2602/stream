import type { Request } from "express";
import type { User} from "@/prisma/generated";
import type { SessionMetadata } from "@/src/shared/types/session-metadata";
import {InternalServerErrorException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export function saveSession(
    req: Request,
    user: User,
    metadata: SessionMetadata
) {
    return new Promise((resolve, reject) => {
        req.session.createdAt = new Date();
        req.session.userId = user.id
        req.session.metadata = metadata

        req.session.save((err) => {
            if (err) {
                return reject(new InternalServerErrorException("Could not create session"));
            }

            resolve(user)
        })
    })
}

export function deleteSession(req: Request, configService: ConfigService) {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                return reject(new InternalServerErrorException("Could not delete session"));
            }
        })

        req.res.clearCookie(
            configService.getOrThrow<string>("SESSION_NAME")
        )

        resolve(true)
    })
}