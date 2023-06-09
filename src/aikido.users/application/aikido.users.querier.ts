/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user.js';
import AikidoUserRepo from '../domain/aikido.user.repo.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsUC_Querier');

export default class AikidoUserQuerier {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserQuerier instantiated');
  }

  async execute(): Promise<AikidoUser[]> {
    const result = await this.repo.query();
    return result;
  }
}
