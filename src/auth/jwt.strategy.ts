import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserStatus } from '../auth/user-status.enum';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWTの有効期限を考慮する(false)か、無視(true)するか
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // validate()が自動的に実行されるため、名前は変えないこと
  async validate(payload: {
    id: string;
    userName: string;
    userStatus: UserStatus;
  }): Promise<User> {
    const { id, userStatus, userName } = payload;
    const user = await this.userRepository.findOne({
      id,
      userName,
      userStatus,
    });

    if (user) return user;
    else throw new UnauthorizedException();
  }
}
