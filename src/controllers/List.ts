import { ListService } from '~/services/';
import { NextFunction, Request, Response } from 'express';

export default class ListController {
  listService: ListService;

  constructor() {
    this.listService = new ListService();
  }

  getList = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const listData = await this.listService.getList();

      res.json(listData);
    } catch (e) {
      next(e);
    }
  };

  getListDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const listData = await this.listService.getListDetails(id);

      res.json(listData);
    } catch (e) {
      next(e);
    }
  };
}
