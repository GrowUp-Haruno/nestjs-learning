import { Budget } from '../entities/budget.entity';
import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

export const initialBudgets: Budget['budgets'] = [
  {
    category: '移動費',
    details: [],
  },
  {
    category: '宿泊費',
    details: [],
  },
  {
    category: '食費',
    details: [],
  },
  {
    category: '観光費',
    details: [],
  },
  {
    category: 'お土産代',
    details: [],
  },
];

@EntityRepository(Budget)
export class BudgetRepository extends Repository<Budget> {
  async initial(user: User): Promise<Budget> {
    const budget = this.create({
      budgets: initialBudgets,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });

    await this.save(budget);

    return budget;
  }
}
