import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

import { ItemsService } from 'src/items/items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Create
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, user);
  }

  // Read
  @Get()
  async findall(): Promise<Item[]> {
    return this.itemsService.findall();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: Item['id']): Promise<Item> {
    return this.itemsService.findById(id);
  }

  // Update
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  // Delete
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteItem(
    @Param('id', ParseUUIDPipe) id: Item['id'],
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemsService.deleteItem(id, user);
  }
}
