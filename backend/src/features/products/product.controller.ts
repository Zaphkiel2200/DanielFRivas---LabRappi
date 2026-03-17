import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getProducts = (req: Request, res: Response) => {
    const products = this.productService.getProducts();
    return res.json(products);
  };
}
