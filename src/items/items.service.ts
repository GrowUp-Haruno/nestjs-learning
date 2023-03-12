import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from 'src/items/item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = [];

  // Create
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItem(createItemDto);
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
