import { User } from './../entities/user.entity';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';

import { Budget } from '../entities/budget.entity';
import { BudgetService } from './budget.service';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Body } from '@nestjs/common';

@Controller('budget')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async initialBudget(@GetUser() user: User): Promise<Budget> {
    return await this.budgetService.initial(user);
  }

  @Get()
  async findByUser(@GetUser() user: User): Promise<Budget> {
    return await this.budgetService.findByUser(user);
  }

  @Patch()
  async updateBudget(
    @GetUser() user: User,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return await this.budgetService.update(user, updateBudgetDto);
  }
}
