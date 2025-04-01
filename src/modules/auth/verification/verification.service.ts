import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "@/src/core/prisma/prisma.service";
import {MailService} from "@/src/modules/libs/mail/mail.service";
import {VerificationInput} from "@/src/modules/auth/verification/inputs/verification.input";
import {$Enums, User} from "@/prisma/generated";
import TokenType = $Enums.TokenType;
import {getSessionMetaData} from "@/src/shared/utils/session-metadata.util";
import {saveSession} from "@/src/shared/utils/session.util";
import {generateToken} from "@/src/shared/utils/generate-token.util";

@Injectable()
export class VerificationService {
    constructor(private readonly prismaService: PrismaService, private readonly mailService: MailService) {
    }

    async verify(req: Request, input: VerificationInput, userAgent: string) {
        const { token } = input

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token,
                type: TokenType.EMAIL_VERIFY
            }
        })

        if (!existingToken) {
            throw new NotFoundException("Token not found")
        }

        const isExpired = new Date(existingToken.expiresIn) < new Date();

        if (isExpired) {
            throw new BadRequestException("Token expired")
        }

        const user = await this.prismaService.user.update({
                where: {
                    id: existingToken.userId,
                },
                data: {
                    isEmailVerified: true
                }
            })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.EMAIL_VERIFY
            }
        })

        const metadata = getSessionMetaData(req, userAgent)

        return saveSession(req, user, metadata);
    }

    async sendVerificationToken(user: User) {
        const verificationToken = await generateToken(
            this.prismaService,
            user,
            TokenType.EMAIL_VERIFY,
            true
        )

        await this.mailService.sendVerificationEmail(user.email, verificationToken)
    }
}
