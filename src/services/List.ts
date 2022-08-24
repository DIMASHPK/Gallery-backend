import { ListQueries } from '~/queries';
import { LimitPageType } from '~/types';
import { ListItemType } from '~/models.types';

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
    const { rows } = await this.listQueries.getListDetails(id);

    const resultAcc = {
      itemData: {} as ListItemType,
      hasPrevious: false,
      hasNext: false,
    };

    const handleReduce = (acc: typeof resultAcc, item: ListItemType) => {
      const { id: queriedId, images } = item;

      if (queriedId === parseInt(id, 10)) {
        return {
          ...acc,
          itemData: {
            ...item,
            images: !images.every(Boolean) ? [] : images,
          },
        };
      }

      if (queriedId < parseInt(id, 10)) {
        return {
          ...acc,
          hasPrevious: true,
        };
      }

      if (queriedId > parseInt(id, 10)) {
        return {
          ...acc,
          hasNext: true,
        };
      }

      return acc;
    };

    return rows.reduce(handleReduce, resultAcc);
  };
}
