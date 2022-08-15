import { ListQueries } from '~/queries';

export default class ListService {
  listQueries: ListQueries;

  constructor() {
    this.listQueries = new ListQueries();
  }

  getList = async () => {
    const { rows } = await this.listQueries.getList();

    const data = rows.map(item => ({
      ...item,
      images: !item.images.every(Boolean) ? [] : item.images,
    }));

    return { data };
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
