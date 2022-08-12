import postgresPool from '~/configs/postgresPool';
import { getPSQLSelectQuery } from '~/utils/psqlQueryUtils';

export default class ListQueries {
  pull: typeof postgresPool;

  constructor() {
    this.pull = postgresPool;
  }

  getList = async () => {
    const query = getPSQLSelectQuery({ limit: 20, from: 'list' });

    const queryData = {
      name: 'fetch-list',
      text: query,
    };

    return this.pull.query(queryData);
  };
}
