import { Router } from 'express';
import { ProductController } from './product.controller';

export class ProductRouter {
  public router: Router;
  private productController: ProductController;

  constructor(productController: ProductController) {
    this.router = Router();
    this.productController = productController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.productController.getProducts);
  }
}
