import { Budget } from '../entities/budget.entity';
import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { CreateBudgetDto } from './dto/create-budget.dto';

@EntityRepository(Budget)
export class BudgetRepository extends Repository<Budget> {
  async initialBudget(user: User): Promise<Budget> {
    const budget = this.create({
      budgets: [
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
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });

    await this.save(budget);

    return budget;
  }
}
