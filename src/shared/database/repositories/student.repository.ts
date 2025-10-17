import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { type Prisma, Student } from '@prisma/client';

@Injectable()
export class StudentRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(createStudentData: Prisma.StudentCreateInput): Promise<Student> {
        return this.prismaService.student.create({
            data: createStudentData,
        });
    }
}