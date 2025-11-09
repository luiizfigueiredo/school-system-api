import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserData: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserData,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updatePassword(id: string, hashedPassword: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
