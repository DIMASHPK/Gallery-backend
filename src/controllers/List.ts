import { ListService } from '~/services/';
import { NextFunction, Request, Response } from 'express';

export default class ListController {
  listService: ListService;

  constructor() {
    this.listService = new ListService();
  }

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        query: { limit = '20', page = '1' },
      } = req;

      const listData = await this.listService.getList({
        limit: limit as string,
        page: page as string,
      });

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
