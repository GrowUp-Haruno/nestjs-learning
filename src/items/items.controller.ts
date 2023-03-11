import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemStatus } from 'src/items/item-status.enum';
import { Item } from 'src/items/item.model';
import { ItemsService } from 'src/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Create
  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    };
    return this.itemsService.create(item);
  }

  // Read
  @Get()
  findall(): Item[] {
    return this.itemsService.findall();
  }

  @Get(':id')
  findById(@Param('id') id: Item['id']): Item {
    return this.itemsService.findById(id);
  }

  // Update
  @Patch(':id')
  updateStatus(@Param('id') id: Item['id']): Item {
    return this.itemsService.updateStatus(id);
  }

  // Delete
  @Delete(':id')
  deleteItem(@Param('id') id: Item['id']): void {
    this.itemsService.deleteItem(id);
  }
}
