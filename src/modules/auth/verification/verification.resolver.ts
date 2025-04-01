import {Context, Mutation, Resolver} from '@nestjs/graphql';
import { VerificationService } from './verification.service';
import {GqlContext} from "@/src/shared/types/gql-context";
import {VerificationInput} from "@/src/modules/auth/verification/inputs/verification.input";
import {UserAgent} from "@/src/shared/decorators/user-agent.decorator";
import {UserModel} from "@/src/modules/auth/account/models/user.model";

@Resolver('Verification')
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Mutation(() => UserModel, { name: 'Verification' } )
  async verify(@Context() { req }: GqlContext, @Args('data') input: VerificationInput, @UserAgent() userAgent: string){
    return this.verificationService.verify(req, input, userAgent);
  }
}
