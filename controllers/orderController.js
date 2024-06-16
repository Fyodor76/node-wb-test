import { OrderService } from "../services/orderService.js";

export const OrderController = {
  createOrder: async (req, res) => {
    try {
      const userId = req.userId;
      const order = await OrderService.createOrder({ userId });
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getCompletedOrders: async (req, res) => {
    try {
      const userId = req.userId;
      const orders = await OrderService.getCompletedOrders({ userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching completed orders:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};