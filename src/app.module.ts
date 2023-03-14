import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ['.env.development.local'],
    // }),
    ItemsModule,
    TypeOrmModule.forRoot({}),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
