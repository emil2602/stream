import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import { SessionService } from './session.service';
import {UserModel} from "@/src/modules/auth/account/models/user.model";
import {GqlContext} from "@/src/shared/types/gql-context";
import {LoginInput} from "@/src/modules/auth/session/inputs/login.input";
import {UserAgent} from "@/src/shared/decorators/user-agent.decorator";
import {Authorization} from "@/src/shared/decorators/auth.decorator";
import {SessionModel} from "@/src/modules/auth/session/models/session.model";

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => [SessionModel], {name: 'findSessionByUser'})
  async findByUser(@Context() { req }: GqlContext) {
      return this.sessionService.findByUser(req);
  }

  @Authorization()
  @Query(() => SessionModel, {name: 'findCurrentSession'})
  async findCurrent(@Context() { req }: GqlContext) {
    return this.sessionService.findCurrent(req);
  }

  @Mutation(() => UserModel, {name: 'login'})
  async login(@Context() {req}: GqlContext, @Args('data') input: LoginInput, @UserAgent() userAgent: string) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, {name: 'logout'})
  async logout(@Context() {req}: GqlContext) {
    return this.sessionService.logout(req)
  }

  @Authorization()
  @Mutation(() => Boolean, {name: 'clearSessionCookie'})
  async clearSession(@Context() {req}: GqlContext) {
    return this.sessionService.clearSession(req)
  }

  @Authorization()
  @Mutation(() => Boolean, {name: 'removeSession'})
  async remove(@Context() {req}: GqlContext, @Args('id') id: string) {
    return this.sessionService.remove(req, id)
  }
}
