import { Router } from 'express';
import { OrderController } from './order.controller';

export class OrderRouter {
  public router: Router;
  private orderController: OrderController;

  constructor(orderController: OrderController) {
    this.router = Router();
    this.orderController = orderController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.orderController.getOrders);
    this.router.post('/', this.orderController.createOrder);
  }
}
