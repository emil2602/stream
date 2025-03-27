import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

@InputType()
export class LoginInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    login: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}