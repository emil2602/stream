import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {render} from "@react-email/components";
import {VerificationTemplate} from "@/src/modules/libs/mail/templates/verification.template";

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailService, private readonly configService: ConfigService) {}


    async sendVerificationEmail(email: string, token: string){
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

        const html = await render(VerificationTemplate({ domain , token}))

        return this.sendEmail(email, 'Account verification', html)
    }

    private async sendEmail(email: string, subject, html) {
        return this.mailService.sendEmail({
            to: email,
            subject,
            html,
        });
    }
}
