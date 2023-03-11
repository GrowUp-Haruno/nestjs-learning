import { Injectable } from '@nestjs/common';
import { Item } from 'src/items/item.model';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  // Create
  create(item: Item): Item {
    this.items.push(item);
    return item;
  }

  // Read
  findall(): Item[] {
    return this.items;
  }

  findById(id: Item['id']): Item {
    return this.items.find((item) => item.id === id);
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
