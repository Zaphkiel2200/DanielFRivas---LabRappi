interface Order {
  id: number;
  restaurant: string;
  customer: string;
  address: string;
  total: number;
  status: 'pending' | 'accepted' | 'delivered';
}

export class OrderService {
  private orders: Order[] = [
    { id: 101, restaurant: 'Burger Palace', customer: 'Juan Pérez', address: 'Calle 123 #45-67', total: 20000, status: 'pending' },
    { id: 102, restaurant: 'Luigi Pizza', customer: 'María Gómez', address: 'Cra. 50 #10-20', total: 25000, status: 'pending' }
  ];

  getOrders() {
    return this.orders;
  }

  createOrder(data: Omit<Order, 'id' | 'status'>) {
    const newOrder: Order = {
      ...data,
      id: Date.now(),
      status: 'pending'
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: number, status: 'pending' | 'accepted' | 'delivered'): Order | undefined {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) return undefined;
    
    this.orders[orderIndex].status = status;
    return this.orders[orderIndex];
  }
}
