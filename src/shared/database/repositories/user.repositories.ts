import { PrismaService } from "../prisma.service";
import { type Prisma } from '@prisma/client';

export class UserRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    create(createDTO: Prisma.UserCreateArgs) {
        return this.prismaService.user.create(createDTO)
    }
}