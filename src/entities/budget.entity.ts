import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  budgets: Array<{
    category: '移動費' | '宿泊費' | '食費' | '観光費' | 'お土産代';
    details: Array<{
      name: string;
      price: number;
    }>;
  }>;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;

  @Column()
  userId: string;
}
