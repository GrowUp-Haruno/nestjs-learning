import { User } from './../entities/user.entity';
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { BudgetRepository } from './budget.repository';
import { Budget } from '../entities/budget.entity';

@Controller('budget')
@UseInterceptors(ClassSerializerInterceptor)
export class BudgetController {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async initialBudget(@GetUser() user: User): Promise<Budget> {
    return await this.budgetRepository.initialBudget(user);
  }
  @Post('test')
  @UseGuards(JwtAuthGuard)
  async test(@GetUser() user: User): Promise<User> {
    return await user;
  }
}
