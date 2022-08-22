import { ListQueries } from '~/queries';
import { LimitPageType } from '~/types';

export default class ListService {
  listQueries: ListQueries;

  constructor() {
    this.listQueries = new ListQueries();
  }

  getList = async (args: LimitPageType) => {
    const { page, limit } = args;

    const { rows } = await this.listQueries.getList({ page, limit });

    const countRes = await this.listQueries.getListCount();

    const listCount = parseInt(countRes.rows[0].count, 10);

    const data = rows.map(item => ({
      ...item,
      images: !item.images.every(Boolean) ? [] : item.images,
    }));

    const isEnd = !(listCount - parseInt(page, 10) * parseInt(limit, 10));

    return { data, page, isEnd, listCount };
  };

  getListDetails = async (id: string) => {
    const {
      rows: [row],
    } = await this.listQueries.getListDetails(id);

    const data = {
      ...row,
      images: !row.images.every(Boolean) ? [] : row.images,
    };

    return { data };
  };
}
