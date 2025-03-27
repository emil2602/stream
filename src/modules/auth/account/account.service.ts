import {ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from "@/src/core/prisma/prisma.service";
import {CreateUserInput} from "@/src/modules/auth/account/inputs/create-user.input";
import {hash} from "argon2";

@Injectable()
export class AccountService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUser(id: string) {
        const user = await this.prismaService.user.findUnique(
            {
                where: {
                    id
                }
            }
        )

        return user
    }

    async create(input: CreateUserInput) {
        const { username, email, password } = input

        const isUserNameExists = await this.prismaService.user.findUnique({
            where: { username },
        })

        if (isUserNameExists) {
            throw new ConflictException('User name already exists')
        }

        const isEmailExists = await this.prismaService.user.findUnique({
            where: { email },
        })

        if (isEmailExists) {
            throw new ConflictException('Email already exists')
        }

        await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username
            }
        })

        return true
    }
}
