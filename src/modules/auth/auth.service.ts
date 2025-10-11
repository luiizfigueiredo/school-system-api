import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { SignupUserDTO } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}
    
    async createUser(createUserDto: SignupUserDTO) {
        try {
            const { email, name, password } = createUserDto;

            const emailTaken = await this.userRepository.findByEmail(email);

            if (emailTaken) {
                throw new Error("Email already in use");
            }

            const user = await this.userRepository.create({
                email: email,
                name: name,
                password: password,
                active: true,
                createdAt: new Date(),
            });

            const accessToken = await this.genetateToken(user.id);

            return { accessToken };

        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
        
    }

    private genetateToken(userId: string) {
        return this.jwtService.signAsync({ sub: userId } );
    }
    
}
