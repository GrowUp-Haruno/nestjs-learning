import { Test } from '@nestjs/testing';
import { ItemRepository } from '../items/item.repository';
import { ItemsService } from '../items/items.service';
import { User } from '../entities/user.entity';
import { UserStatus } from '../auth/user-status.enum';

import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

type MockItemRepository = {
  find: jest.Mock<any, any>;
  findOne: jest.Mock<any, any>;
  createItem: jest.Mock<any, any>;
  save: jest.Mock<any, any>;
  delete: jest.Mock<any, any>;
};
const mockItemRepository = (): MockItemRepository => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser1: User = {
  id: 'test-id-1',
  userName: 'test1',
  password: '123',
  userStatus: UserStatus.PREMIUM,
  items: [],
  budgets: [],
};
const mockUser2: User = {
  id: 'test-id-2',
  userName: 'test2',
  password: '123',
  userStatus: UserStatus.FREE,
  items: [],
  budgets: [],
};

describe('items service test', () => {
  let itemsService: ItemsService;
  let itemRepository: MockItemRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<MockItemRepository>(ItemRepository);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      itemRepository.find.mockResolvedValue(expected);

      const result = await itemsService.findall();
      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected: Item = {
        id: 'test-id',
        name: 'pc',
        price: 100,
        status: ItemStatus.ON_SALE,
        description: 'mockアイテム',
        createdAt: '',
        updatedAt: '',
        user: mockUser1,
        userId: mockUser1.id,
      };
      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById('test-id-1');

      expect(result).toEqual(expected);
    });

    it('異常系：商品が存在しない', async () => {
      itemRepository.findOne.mockResolvedValue(null);
      await expect(itemsService.findById('test-id-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('正常系', async () => {
      const expected: Item = {
        id: 'test-id',
        name: 'pc',
        price: 100,
        status: ItemStatus.ON_SALE,
        description: 'mockアイテム',
        createdAt: '',
        updatedAt: '',
        user: mockUser1,
        userId: mockUser1.id,
      };
      itemRepository.createItem.mockResolvedValue(expected);

      const result = await itemsService.create(
        {
          name: 'pc2',
          price: 100,
          description: 'mockアイテム',
        },
        mockUser1,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    const mockItem: Item = {
      id: 'test-id-1',
      name: 'pc',
      price: 100,
      status: ItemStatus.ON_SALE,
      description: 'mockアイテム',
      createdAt: '',
      updatedAt: '',
      user: mockUser1,
      userId: mockUser1.id,
    };

    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus('test-id-1', mockUser2);

      // toHaveBeenCalled()はこのブロック内でexpect()の引数で指定した
      // 関数が実行されるかをテストする
      expect(itemRepository.save).toHaveBeenCalled();
    });

    it('異常系：自身の商品を購入', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(
        itemsService.updateStatus('test-id-1', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    const mockItem: Item = {
      id: 'test-id-1',
      name: 'pc',
      price: 100,
      status: ItemStatus.ON_SALE,
      description: 'mockアイテム',
      createdAt: '',
      updatedAt: '',
      user: mockUser1,
      userId: mockUser1.id,
    };

    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.deleteItem('test-id-1', mockUser1);

      expect(itemRepository.delete).toHaveBeenCalled();
    });

    it('異常系: 他人の商品を削除', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);

      await expect(
        itemsService.deleteItem('test-id-1', mockUser2),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
