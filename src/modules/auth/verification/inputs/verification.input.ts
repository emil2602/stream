import {Field} from "@nestjs/graphql";
import {IsNotEmpty, IsUUID} from "class-validator";

export class VerificationInput {
    @Field(() => String)
    @IsUUID('4')
    @IsNotEmpty()
    token: string;
}