import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { BaseError } from 'src/shared/error/base-error';
import { authError } from 'src/shared/error/messages/auth.error';
import { compare, hash } from 'bcrypt';
import { envValues } from 'src/shared/.env-values';
import { SignupInput } from './inputs/signup.input';
import { SigninInput } from './inputs/signin.input';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}
    
    async signup(createUserInput: SignupInput) {
        try {
            const { email, userType } = createUserInput;
            const emailTaken = await this.userRepository.findByEmail(email);

            if (emailTaken) {
                throw new BaseError(authError.AUTH_002);
            }

            const hashedDeafultPassword = await hash(envValues.DEFAULT_PASSWORD, 12);

            const result = await this.prismaService.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        email: createUserInput.email,
                        name: createUserInput.name,
                        rg: createUserInput.rg,
                        cpf: createUserInput.cpf,
                        phone: createUserInput.phone,
                        address: createUserInput.address,
                        cep: createUserInput.cep,
                        birthDate: createUserInput.birthDate,
                        userType: userType as any, // Cast necessário para compatibilidade Prisma
                        password: hashedDeafultPassword,
                        createdAt: new Date(),
                    },
                });

                if (userType === UserType.STUDENT) {
                    await prisma.student.create({
                        data: {
                            userId: user.id,
                            studentId: this.generateStudentId(),
                        },
                    });
                }

                if (userType === UserType.INSTRUCTOR) {
                    await prisma.instructor.create({
                        data: {
                            userId: user.id,
                            formation: '', // Você pode adicionar isso como campo opcional no SignupInput se necessário
                        },
                    });
                }

                return user;
            });

            if (!result) {
                throw new BaseError(authError.AUTH_003);
            }

            return {
                id: result.id,
                name: result.name,
                email: result.email,
                active: result.active,
                createdAt: result.createdAt
            };

        } catch (error) {
            console.error("Error creating user:", error);
            throw error
        }
    }

    async signin(singInInput: SigninInput) {
        try {
            const { email, password } = singInInput;
            
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new BaseError(authError.AUTH_001);
            }
            
            const isPasswordValid = await compare(password, user.password);

            if (!isPasswordValid) {
                throw new BaseError(authError.AUTH_001);
            }

            const accessToken = await this.genetateToken(user.id);

            return { accessToken };

        } catch (error) {
            console.error("Error creating user:", error);
            throw error
        } 
    }

    private genetateToken(userId: string) {
        return this.jwtService.signAsync({ sub: userId } );
    }
    
    private generateStudentId() {
        return 'STU' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
