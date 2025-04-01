import {Field, FieldOptions, ID, ObjectType} from "@nestjs/graphql";
import {User} from "@/prisma/generated";

@ObjectType()
export class UserModel implements User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    displayName: string;

    @Field(() => String, { nullable: true } as FieldOptions)
    avatar: string;

    @Field(() => String, { nullable: true } as FieldOptions)
    bio: string;

    @Field(() => Boolean)
    isVerified: boolean;

    @Field(() => Boolean)
    isEmailVerified: boolean;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}