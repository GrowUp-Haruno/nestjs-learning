import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from 'src/items/item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  // Create
  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      ...createItemDto,
      id: uuid(),
      status: ItemStatus.ON_SALE,
    };
    this.items.push(item);
    return item;
  }

  // Read
  findall(): Item[] {
    return this.items;
  }

  findById(id: Item['id']): Item {
    const foundItem = this.items.find((item) => item.id === id);
    if (!foundItem) throw new NotFoundException();
    return foundItem;
  }

  //Update
  updateStatus(id: Item['id']): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  // Delete
  deleteItem(id: Item['id']) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
