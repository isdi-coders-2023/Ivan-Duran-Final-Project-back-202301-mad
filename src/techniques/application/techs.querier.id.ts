/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech.js';
import TechRepo from '../domain/tech.repo.js';

const debug = createDebug('AiJo:TechUC_QuerierId');

export default class TechQuerierId {
  constructor(private repo: TechRepo) {
    debug('TechQuerierId instantiated');
  }

  async execute(id: string): Promise<Tech> {
    const result = await this.repo.queryById(id);
    return result;
  }
}
