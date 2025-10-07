import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { SignupUserDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}
    async createUser(createUserDto: SignupUserDTO) {
        try {
            const { email, name, password } = createUserDto;

            const emailTaken = await this.userRepository.findByEmail(email);

            if (emailTaken) {
                throw new Error("Email already in use");
            }

            await this.userRepository.create({
                email: email,
                name: name,
                password: password,
                active: true,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
        
    }
}
