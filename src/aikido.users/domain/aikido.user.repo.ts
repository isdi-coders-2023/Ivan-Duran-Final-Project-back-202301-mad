import { AikidoUser, ProtoAikidoUser } from './aikido.user.js';

export default interface AikidoUserRepo {
  create: (_entity: ProtoAikidoUser) => Promise<AikidoUser>;
  update: (_entity: Partial<AikidoUser>) => Promise<AikidoUser>;
  erase: (_id: string) => Promise<void>;
  query: () => Promise<AikidoUser[]>;
  unpopulatedQueryById: (_id: string) => Promise<AikidoUser>;
  queryById: (_id: string) => Promise<AikidoUser>;
  search: (
    _queries: { key: string; value: unknown }[]
  ) => Promise<AikidoUser[]>;
  searchPaged: (
    _queries: { key: string; value: unknown }[],
    _page: string
  ) => Promise<{ members: AikidoUser[]; number: number }>;
}
