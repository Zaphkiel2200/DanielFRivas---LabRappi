import { Router } from 'express';
import { StoreController } from './store.controller';

export class StoreRouter {
  public router: Router;
  private storeController: StoreController;

  constructor(storeController: StoreController) {
    this.router = Router();
    this.storeController = storeController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.storeController.getStores);
  }
}
