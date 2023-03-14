import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password, userStatus } = createUserDto;
    const salt = await genSalt();
    const hashPassword = await hash(password, salt);
    const user = { userName, password: hashPassword, userStatus };

    const successUser = await this.userRepository.createUser(user);

    return { ...successUser, password: 'secret', id: 'secret' };
  }

  async signin(credentialsDto: CredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { userName, password } = credentialsDto;
    const user = await this.userRepository.findOne({ userName });

    if (user && (await compare(password, user.password))) {
      // 他にもパスワード以外の情報を含めても良い
      const payload = {
        id: user.id,
        userName: user.userName,
        userStatus: user.userStatus,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new UnauthorizedException('user名またはpasswordを確認してください');
  }
}
