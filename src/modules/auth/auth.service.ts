import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { JwtService } from '@nestjs/jwt';
import { BaseError } from 'src/shared/error/base-error';
import { authError } from 'src/shared/error/messages/auth.error';
import { compare, hash } from 'bcrypt';
import { envValues } from 'src/shared/.env-values';
import { SignupInput } from './inputs/signup.input';
import { SigninInput } from './inputs/signin.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}
    
    async signup(createUserInput: SignupInput) {
        try {
            const { email, name } = createUserInput;
            const emailTaken = await this.userRepository.findByEmail(email);
            
            if (emailTaken) {
                throw new BaseError(authError.AUTH_002);
            }
            
            const hashedDeafultPassword = await hash(envValues.DEFAULT_PASSWORD, 12);

            const user = await this.userRepository.create({
                email: email,
                name: name,
                password: hashedDeafultPassword,
                active: true,
                createdAt: new Date(),
            });

            if (!user) {
                throw new BaseError(authError.AUTH_003);
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                active: user.active,
                createdAt: user.createdAt
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
    
}
