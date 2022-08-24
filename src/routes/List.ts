import { Router, Express } from 'express';
import { ROUTES } from '~/data';
import { ListController } from '~/controllers';

export default class ListRoutes {
  router: Router;

  app: Express;

  listController: ListController;

  constructor(app: Express) {
    this.router = Router();
    this.app = app;
    this.listController = new ListController();
  }

  initListRoutes = () => {
    const { LIST } = ROUTES;

    this.setRoutes();

    this.app.use(LIST, this.router);
  };

  setRoutes = () => {
    this.router.get('/', this.listController.getList);
    this.router.get('/:id', this.listController.getListDetails);
  };
}
