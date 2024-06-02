import { OrderService } from "../services/orderService.js";

export const OrderController = {
  createOrder: async (req, res) => {
    try {
      const { userId } = req.body;
      const order = await OrderService.createOrder({ userId });
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
