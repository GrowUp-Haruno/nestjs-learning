import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/auth/user-status.enum';
import { Item } from 'src/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  userStatus: UserStatus;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
