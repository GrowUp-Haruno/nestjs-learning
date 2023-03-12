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
  async findall(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: Item['id']): Promise<Item> {
    const foundItem = await this.itemRepository.findOne(id);
    if (!foundItem) throw new NotFoundException();
    return foundItem;
  }

  // Update
  async updateStatus(id: Item['id']): Promise<Item> {
    const updateItem = await this.findById(id);
    updateItem.status = ItemStatus.SOLD_OUT;

    return await this.itemRepository.save(updateItem);
  }

  // Delete
  async deleteItem(id: Item['id']): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
