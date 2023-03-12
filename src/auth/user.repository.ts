import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password, userStatus } = createUserDto;
    const user = this.create({
      userName,
      password,
      userStatus,
    });

    return await this.save(user);
  }
}
