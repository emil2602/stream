import {createParamDecorator, type ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

export const UserAgent = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        if (ctx.getType() === 'http') {
            const request = ctx.switchToHttp().getRequest();

            return request.headers['user-agent']
        } else {
            const context = GqlExecutionContext.create(ctx)

            return context.getContext().req.headers['user-agent'];
        }
    }
)