import { Exclude } from 'class-transformer';
import { UserStatus } from '../auth/user-status.enum';
import { Item } from './item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Budget } from './budget.entity';

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

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];
}
