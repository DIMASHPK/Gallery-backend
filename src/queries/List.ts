import postgresPool from '~/configs/postgresPool';
import { getPSQLSelectQuery } from '~/utils/psqlQueryUtils';

export default class ListQueries {
  pull: typeof postgresPool;

  constructor() {
    this.pull = postgresPool;
  }

  getList = async () => {
    const query = getPSQLSelectQuery({
      limit: 20,
      from: 'list',
      join: 'LEFT JOIN list_images ON list.id = list_images.list_id',
      groupBy: 'list.id',
      fields:
        'list.*, array_agg(row_to_json(list_images.*) ORDER BY list_images.id ASC) as images',
      orderBy: 'list.id ASC',
    });

    const queryData = {
      name: 'fetch-list',
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
}
