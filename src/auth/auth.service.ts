import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password, userStatus } = createUserDto;
    const salt = await genSalt();
    const hashPassword = await hash(password, salt);
    const user = { userName, password: hashPassword, userStatus };

    const successUser = await this.userRepository.createUser(user);

    return { ...successUser, password: 'secret', id: 'secret' };
  }
}
