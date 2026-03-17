import { Router } from 'express';
import { OrderService } from './features/orders/order.service';
import { OrderController } from './features/orders/order.controller';
import { OrderRouter } from './features/orders/order.router';
import { StoreService } from './features/stores/store.service';
import { StoreController } from './features/stores/store.controller';
import { StoreRouter } from './features/stores/store.router';
import { ProductService } from './features/products/product.service';
import { ProductController } from './features/products/product.controller';
import { ProductRouter } from './features/products/product.router';

const router = Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);

const storeService = new StoreService();
const storeController = new StoreController(storeService);
const storeRouter = new StoreRouter(storeController);

const productService = new ProductService();
const productController = new ProductController(productService);
const productRouter = new ProductRouter(productController);

router.use('/orders', orderRouter.router);
router.use('/stores', storeRouter.router);
router.use('/products', productRouter.router);

export default router;