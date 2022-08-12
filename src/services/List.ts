import { ListQueries } from '~/queries';

export default class ListService {
  listQueries: ListQueries;

  constructor() {
    this.listQueries = new ListQueries();
  }

  getList = async () => this.listQueries.getList();
}
