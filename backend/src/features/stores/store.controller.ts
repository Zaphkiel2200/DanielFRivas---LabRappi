import { Request, Response } from 'express';
import { StoreService } from './store.service';

export class StoreController {
  private storeService: StoreService;

  constructor(storeService: StoreService) {
    this.storeService = storeService;
  }

  getStores = (req: Request, res: Response) => {
    const stores = this.storeService.getStores();
    return res.json(stores);
  };
}
