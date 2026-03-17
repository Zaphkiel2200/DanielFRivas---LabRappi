import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { OrderService } from './order.service';

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  getOrders = (req: Request, res: Response) => {
    const orders = this.orderService.getOrders();
    return res.json(orders);
  };

  createOrder = (req: Request, res: Response) => {
    const { restaurant, customer, address, total } = req.body;

    if (!restaurant) {
      throw Boom.badRequest('El nombre del restaurante (restaurant) es requerido');
    }

    if (!customer) {
      throw Boom.badRequest('El nombre del cliente (customer) es requerido');
    }

    if (!address) {
      throw Boom.badRequest('La dirección de entrega (address) es requerida');
    }

    if (total === undefined || total === null) {
      throw Boom.badRequest('El total de la orden (total) es requerido');
    }

    const order = this.orderService.createOrder({
      restaurant,
      customer,
      address,
      total
    });

    return res.status(201).json(order);
  };

  updateOrderStatus = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const { status } = req.body;

    if (isNaN(id)) {
      throw Boom.badRequest('El ID de la orden debe ser un número válido');
    }

    if (!['pending', 'accepted', 'delivered'].includes(status)) {
      throw Boom.badRequest('El status proveído no es válido');
    }

    const order = this.orderService.updateOrderStatus(id, status);

    if (!order) {
      throw Boom.notFound('Orden no encontrada');
    }

    return res.json(order);
  };
}
