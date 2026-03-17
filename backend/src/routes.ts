import { Router } from 'express';
import { OrderService } from './features/orders/order.service';
import { OrderController } from './features/orders/order.controller';
import { OrderRouter } from './features/orders/order.router';

const router = Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);

router.use('/orders', orderRouter.router);

export default router;