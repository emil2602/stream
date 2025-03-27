import {type CanActivate, type ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "@/src/core/prisma/prisma.service";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(private readonly prismaService: PrismaService) {
    }

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const request = ctx.getContext().req

        if (typeof request.session.userId === "undefined") {
            throw new UnauthorizedException('User is not authorized');
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                id: request.session.userId
            }
        })

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        request.user = user;

        return true;
    }
}