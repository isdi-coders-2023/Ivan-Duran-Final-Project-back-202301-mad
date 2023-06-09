import { TechModel } from '../../server/infrastructure/mongoose/tech.model.js';
import { Tech } from '../domain/tech.js';
import TechMongoRepo from './techs.mongo.repo.js';

jest.mock('../../server/infrastructure/mongoose/tech.model');
const repo = new TechMongoRepo();
let popTechValue: unknown;

const mockTechPopulExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(popTechValue),
      })),
    })),
  })),
});

const mockLimit = () => ({
  skip: jest.fn().mockImplementation(() => ({
    limit: jest.fn().mockImplementation(mockTechPopulExec),
  })),
});
let count = 0;

const mockCount = () => ({
  count: jest
    .fn()
    .mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(count) })),
});

const mockExec = () => ({
  exec: jest.fn().mockResolvedValue(popTechValue),
});

const arrangeSearch = async (page: string) => {
  popTechValue = [{}];

  (TechModel.find as jest.Mock).mockImplementationOnce(mockCount);

  (TechModel.find as jest.Mock).mockImplementationOnce(mockLimit);
  const result = await repo.searchPaged(
    [
      { key: 'Test', value: 'testing' },
      { key: 'Test2', value: 'testing2' },
    ],
    page
  );
  return result;
};

describe('Given the TechsRepo', () => {
  describe('When call the Query method', () => {
    test('Then it should return the Techs array', async () => {
      popTechValue = [{}];
      (TechModel.find as jest.Mock).mockImplementation(mockTechPopulExec);
      const result = await repo.query();
      expect(result).toEqual([{}]);
    });
  });

  describe('When call the queryById method', () => {
    describe('And the id returns a user', () => {
      test('Then it should return the user', async () => {
        popTechValue = {};
        (TechModel.findById as jest.Mock).mockReturnValueOnce({
          exec: jest.fn().mockReturnValueOnce({}),
        });
        const result = await repo.unpopulatedQueryById('1');
        expect(result).toEqual({});
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        (TechModel.findById as jest.Mock).mockReturnValueOnce({
          exec: jest.fn().mockReturnValueOnce(undefined),
        });
        const result = repo.unpopulatedQueryById('1');
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When call the queryById method', () => {
    describe('And the id returns a user', () => {
      test('Then it should return the user', async () => {
        popTechValue = {};
        (TechModel.findById as jest.Mock).mockImplementation(mockTechPopulExec);
        const result = await repo.queryById('1');
        expect(result).toEqual({});
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findById as jest.Mock).mockImplementation(mockTechPopulExec);
        const result = repo.queryById('1');
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When called the search method', () => {
    test('Then it should return the Techs array', async () => {
      popTechValue = [{}];
      (TechModel.find as jest.Mock).mockImplementation(mockTechPopulExec);
      const result = await repo.search([
        { key: 'Test', value: 'testing' },
        { key: 'Test2', value: 'testing2' },
      ]);
      expect(result).toEqual([{}]);
    });
  });

  describe('When called the searchPaged method with page 0', () => {
    test('Then it should return the AikidoUsers array with page 1', async () => {
      const result = await arrangeSearch('0');
      expect(result).toEqual({ techs: [{}], number: 0 });
    });
  });

  describe('When called the searchPaged method with page 2', () => {
    test('Then it should return the AikidoUsers array skipping the first 6', async () => {
      const result = await arrangeSearch('2');

      expect(result).toEqual({ techs: [{}], number: 0 });
    });
  });

  describe('When called the searchPaged method with page 1', () => {
    describe('And there is more than 3 items', () => {
      test('Then it should return the Techs array without skipping', async () => {
        popTechValue = [{}];
        count = 5;
        (TechModel.find as jest.Mock).mockImplementationOnce(mockCount);

        (TechModel.find as jest.Mock).mockImplementationOnce(mockLimit);
        const result = await repo.searchPaged(
          [
            { key: 'Test', value: 'testing' },
            { key: 'Test2', value: 'testing2' },
          ],
          '1'
        );
        expect(result).toEqual({ techs: [{}], number: 5 });
      });
    });
  });

  describe('When call the create method', () => {
    test('Then it should return the created Tech', async () => {
      (TechModel.create as jest.Mock).mockResolvedValue({
        attack: 'Ai hanmi katate-dori',
      });
      const result = await repo.create({
        attack: 'Ai hanmi katate-dori',
      } as Tech);
      expect(TechModel.create).toHaveBeenCalledWith({
        attack: 'Ai hanmi katate-dori',
      });
      expect(result).toEqual({ attack: 'Ai hanmi katate-dori' });
    });
  });

  describe('When call the update method', () => {
    describe('And the user exists', () => {
      test('Then it should return the user updated', async () => {
        popTechValue = { attack: 'UpdTest', id: '1' };
        (TechModel.findByIdAndUpdate as jest.Mock).mockImplementation(mockExec);
        const entity = { attack: 'Shomen-uchi', id: '1' } as Tech;
        const result = await repo.update(entity);
        expect(TechModel.findByIdAndUpdate).toHaveBeenCalledWith(
          entity.id,
          entity,
          {
            new: true,
          }
        );
        expect(result).toEqual({ id: '1', attack: 'UpdTest' });
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findByIdAndUpdate as jest.Mock).mockImplementation(mockExec);
        const result = repo.update({ attack: 'Ai hanmi katate-dori' });
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When call the erase method', () => {
    describe('And the user exists', () => {
      test('Then it should delete the user', async () => {
        popTechValue = {};
        (TechModel.findByIdAndDelete as jest.Mock).mockImplementation(mockExec);
        await repo.erase('2');
        expect(TechModel.findByIdAndDelete).toHaveBeenCalledWith('2');
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findByIdAndDelete as jest.Mock).mockImplementation(mockExec);
        const result = repo.erase('2');
        await expect(result).rejects.toThrow();
      });
    });
  });
});
