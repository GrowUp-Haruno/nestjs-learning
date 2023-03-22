import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Budget } from '../../entities/budget.entity';

export class UpdateBudgetDto {
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  budgets: Budget['budgets'];
}
