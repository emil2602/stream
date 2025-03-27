import {Field, FieldOptions, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class UserModel {
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

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}