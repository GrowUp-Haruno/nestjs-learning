import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

import { ItemsService } from 'src/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Create
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
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
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: Item['id'],
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id);
  }

  // Delete
  @Delete(':id')
  async deleteItem(@Param('id', ParseUUIDPipe) id: Item['id']): Promise<void> {
    await this.itemsService.deleteItem(id);
  }
}
