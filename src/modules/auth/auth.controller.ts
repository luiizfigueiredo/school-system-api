import { Body, Controller, Post } from '@nestjs/common';
import { SigningUserDTO } from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    @Post('signin')
    signin(@Body signinDTO: SigningUserDTO) {
        
    }
}
