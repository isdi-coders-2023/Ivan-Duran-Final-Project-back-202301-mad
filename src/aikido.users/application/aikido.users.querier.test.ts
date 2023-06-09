import { mockAikidoUserRepo } from '../../common/mocks/test.mocks.js';
import AikidoUserQuerier from './aikido.users.querier.js';

describe('Given the AikidoUserQuerier class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the query repo method', async () => {
      const aikidoUserQuerier = new AikidoUserQuerier(mockAikidoUserRepo);
      await aikidoUserQuerier.execute();
      expect(mockAikidoUserRepo.query).toHaveBeenCalled();
    });
  });
});
