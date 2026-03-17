export interface Product {
  id: number;
  name: string;
  price: number;
  storeName: string;
  storeId: number;
}

export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Hamburguesa Sencilla', price: 15000, storeName: 'Burger Palace', storeId: 1 },
    { id: 2, name: 'Papas Fritas', price: 5000, storeName: 'Burger Palace', storeId: 1 },
    { id: 3, name: 'Pizza Pepperoni', price: 25000, storeName: 'Luigi Pizza', storeId: 2 },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
