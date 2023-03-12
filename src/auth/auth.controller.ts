import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signin(@Body() credentialDto: CredentialsDto): Promise<{
    accessToken: string;
  }> {
    return await this.authService.signin(credentialDto);
  }
}
