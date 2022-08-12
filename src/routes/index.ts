import { Express } from 'express';
import ListRoutes from '~/routes/List';

export default class Routes {
  listRoutes: ListRoutes;

  constructor(app: Express) {
    this.listRoutes = new ListRoutes(app);
  }

  initRoutes = () => {
    this.listRoutes.initListRoutes();
  };
}
