import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { JwtService } from '@nestjs/jwt';
import { BaseError } from 'src/shared/error/base-error';
import { authError } from 'src/shared/error/messages/auth.error';
import { hash } from 'bcrypt';
import { envValues } from 'src/shared/.env-values';
import { SignupInput } from './inputs/signup.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}
    
    async createUser(createUserInput: SignupInput) {
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
