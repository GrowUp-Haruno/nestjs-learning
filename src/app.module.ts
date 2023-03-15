import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot({}), AuthModule, BudgetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
