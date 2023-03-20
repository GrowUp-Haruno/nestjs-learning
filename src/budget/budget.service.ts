import { User } from './../entities/user.entity';

import { Injectable } from '@nestjs/common';
import { BudgetRepository } from './budget.repository';
import { Budget } from '../entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}
  // Create
  async initialBudget(user: User): Promise<Budget> {
    return await this.budgetRepository.initialBudget(user);
  }
}
