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
import { CreateItemDto } from 'src/items/dto/create-item.dto';

import { Item } from 'src/items/item.model';
import { ItemsService } from 'src/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Create
  @Post()
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  // Read
  @Get()
  findall(): Item[] {
    return this.itemsService.findall();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: Item['id']): Item {
    return this.itemsService.findById(id);
  }

  // Update
  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: Item['id']): Item {
    return this.itemsService.updateStatus(id);
  }

  // Delete
  @Delete(':id')
  deleteItem(@Param('id', ParseUUIDPipe) id: Item['id']): void {
    this.itemsService.deleteItem(id);
  }
}
