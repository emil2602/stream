import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9_]+$/)
    username: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}