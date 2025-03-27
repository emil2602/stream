import {Args, Mutation, Resolver} from '@nestjs/graphql';
import { AccountService } from './account.service';
import {Query} from "@nestjs/graphql";
import {UserModel} from "@/src/modules/auth/account/models/user.model";
import {CreateUserInput} from "@/src/modules/auth/account/inputs/create-user.input";
import {Authorized} from "@/src/shared/decorators/authorized.decorator";
import {Authorization} from "@/src/shared/decorators/auth.decorator";

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, {name: 'findUserProfile'})
  async getUser(@Authorized('id') id: string) {
    console.log(id)
    return this.accountService.getUser(id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }
}
