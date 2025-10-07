import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { type Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(createUserData: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data: createUserData,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }
}