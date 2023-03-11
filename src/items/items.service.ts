import { Injectable } from '@nestjs/common';
import { Item } from 'src/items/item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findall(): Item[] {
    return this.items;
  }

  findById(id: Item['id']): Item {
    return this.items.find((item) => item.id === id);
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
}
