import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from 'src/auth/user-status.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  userStatus: UserStatus;
}
