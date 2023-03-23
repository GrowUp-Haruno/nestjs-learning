import { BudgetService } from '../budget/budget.service';
import { Test } from '@nestjs/testing';
import { BudgetRepository, initialBudgets } from './budget.repository';
import { User } from '../entities/user.entity';
import { UserStatus } from '../auth/user-status.enum';
import { Budget } from '../entities/budget.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
type MockBudgetRepository = {
  findOne: jest.Mock<any, any>;
  save: jest.Mock<any, any>;
};

const mockBudgetRepository = (): MockBudgetRepository => ({
  findOne: jest.fn(),
  save: jest.fn(),
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
  userStatus: UserStatus.PREMIUM,
  items: [],
  budgets: [],
};

describe('budget service test', () => {
  let budgetService: BudgetService;
  let budgetRepository: MockBudgetRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BudgetService,
        {
          provide: BudgetRepository,
          useFactory: mockBudgetRepository,
        },
      ],
    }).compile();

    budgetService = module.get<BudgetService>(BudgetService);
    budgetRepository = module.get<MockBudgetRepository>(BudgetRepository);
  });

  describe('findByUser', () => {
    it('正常系', async () => {
      const expected: Budget = {
        id: 'test-id-1',
        budgets: initialBudgets,
        createdAt: '',
        updatedAt: '',
        user: mockUser1,
        userId: mockUser1.id,
      };
      budgetRepository.findOne.mockResolvedValue(expected);
      const result = await budgetService.findByUser(mockUser1);

      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    const findBudget = {
      id: 'test-id-1',
      budgets: initialBudgets,
      createdAt: '',
      updatedAt: '',
      user: mockUser1,
      userId: mockUser1.id,
    };
    const updateBudgets: Budget['budgets'] = [
      {
        category: '移動費',
        details: [{ name: '新幹線', price: 14000 }],
      },
      {
        category: '宿泊費',
        details: [{ name: 'アパ幕張', price: 20000 }],
      },
      {
        category: '食費',
        details: [{ name: '昼食代', price: 1000 }],
      },
      {
        category: '観光費',
        details: [{ name: 'イベント参加費用', price: 1000 }],
      },
      {
        category: 'お土産代',
        details: [{ name: '家用', price: 2000 }],
      },
    ];

    it('正常系', async () => {
      budgetRepository.findOne.mockResolvedValue(findBudget);
      await budgetService.update(mockUser1, {
        budgets: updateBudgets,
      });

      expect(budgetRepository.save).toHaveBeenCalled();
    });

    it('異常系: 他人の予算を変更', async () => {
      budgetRepository.findOne.mockResolvedValue(findBudget);
      await expect(
        budgetService.update(mockUser2, {
          budgets: updateBudgets,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    const findBudget = {
      id: 'test-id-1',
      budgets: initialBudgets,
      createdAt: '',
      updatedAt: '',
      user: mockUser1,
      userId: mockUser1.id,
    };

    it('正常系', async () => {
      budgetRepository.findOne.mockResolvedValue(findBudget);
      await budgetService.delete(mockUser1);

      expect(budgetRepository.save).toHaveBeenCalled();
    });

    it('異常系: 他人の予算を削除', async () => {
      budgetRepository.findOne.mockResolvedValue(findBudget);
      await expect(budgetService.delete(mockUser2)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
