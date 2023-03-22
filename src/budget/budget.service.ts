import { User } from './../entities/user.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { BudgetRepository, initialBudgets } from './budget.repository';
import { Budget } from '../entities/budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}
  // Read
  async findByUser(user: User): Promise<Budget> {
    const findBudget = await this.budgetRepository.findOne({ userId: user.id });
    if (!findBudget) throw new NotFoundException();
    return findBudget;
  }

  // Update
  async update(user: User, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.findByUser(user);
    budget.budgets = updateBudgetDto.budgets;
    budget.updatedAt = new Date().toISOString();
    await this.budgetRepository.save(budget);
    return budget;
  }

  // Delete
  async delete(user: User): Promise<Budget> {
    const budget = await this.findByUser(user);
    budget.budgets = initialBudgets;
    budget.updatedAt = new Date().toISOString();
    await this.budgetRepository.save(budget);
    return budget;
  }
}
