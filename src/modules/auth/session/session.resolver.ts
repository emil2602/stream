import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import { SessionService } from './session.service';
import {UserModel} from "@/src/modules/auth/account/models/user.model";
import {GqlContext} from "@/src/shared/types/gql-context";
import {LoginInput} from "@/src/modules/auth/session/inputs/login.input";

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel, {name: 'login'})
  async login(@Context() {req}: GqlContext, @Args('data') input: LoginInput) {
    return this.sessionService.login(req, input)
  }

  @Mutation(() => Boolean, {name: 'logout'})
  async logout(@Context() {req}: GqlContext) {
    return this.sessionService.logout(req)
  }
}
