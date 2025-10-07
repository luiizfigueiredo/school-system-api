import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService 
    ) {}

    @Post('signup')
    async signup(@Body() signupDTO: SignupUserDTO) {
       await this.authService.createUser(signupDTO); 
    }
}
