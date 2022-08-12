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
}
