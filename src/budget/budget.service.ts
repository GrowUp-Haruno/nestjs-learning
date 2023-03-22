import { User } from './../entities/user.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { BudgetRepository } from './budget.repository';
import { Budget } from '../entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}
  // Create
  async initial(user: User): Promise<Budget> {
    return await this.budgetRepository.initial(user);
  }

  // Read
  async findByUser(user: User): Promise<Budget> {
    const findBudget = await this.budgetRepository.findOne({ userId: user.id });
    if (!findBudget) throw new NotFoundException();
    return findBudget;
  }
}
