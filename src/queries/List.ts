import postgresPool from '~/configs/postgresPool';
import { getPSQLSelectQuery } from '~/utils/psqlQueryUtils';
import { LimitPageType } from '~/types';

export default class ListQueries {
  pull: typeof postgresPool;

  constructor() {
    this.pull = postgresPool;
  }

  getList = async (args: LimitPageType) => {
    const { limit, page } = args;

    const query = getPSQLSelectQuery({
      limit: parseInt(limit, 10),
      from: 'list',
      join: 'LEFT JOIN list_images ON list.id = list_images.list_id',
      groupBy: 'list.id',
      fields:
        'list.*, array_agg(row_to_json(list_images.*) ORDER BY list_images.id ASC) as images',
      orderBy: 'list.id ASC',
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
    });

    const queryData = {
      name: `fetch-list-${page}`,
      text: query,
    };

    return this.pull.query(queryData);
  };

  getListDetails = async (id: string) => {
    const query = getPSQLSelectQuery({
      limit: 20,
      from: 'list',
      join: 'LEFT JOIN list_images ON list.id = list_images.list_id',
      groupBy: 'list.id',
      fields:
        'list.*, array_agg(row_to_json(list_images.*) ORDER BY list_images.id ASC) as images',
      orderBy: 'list.id ASC',
      where: `list.id=${id}`,
    });

    const queryData = {
      name: `fetch-list-details-${id}`,
      text: query,
    };

    return this.pull.query(queryData);
  };

  getListCount = async () => {
    const query = getPSQLSelectQuery({
      from: 'list',
      fields: 'count(*)',
    });

    const queryData = {
      name: 'fetch-list-count',
      text: query,
    };

    return this.pull.query(queryData);
  };
}
