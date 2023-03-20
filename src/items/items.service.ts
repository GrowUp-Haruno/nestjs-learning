import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from '../items/item.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  // Create
  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return this.itemRepository.createItem(createItemDto, user);
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
  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return item;
  }

  // Delete
  async deleteItem(id: Item['id'], user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    await this.itemRepository.delete({ id });
  }
}
