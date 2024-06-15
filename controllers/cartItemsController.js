import { CartService } from "../services/cartItemsSerive.js";

export const CartController = {
  addItem: async (req, res) => {
    try {
      const userId = req.userId
      const { productId, quantity, price } = req.body;
      console.log(req.body, 'req body');
      const item = await CartService.addItem({ userId, productId, quantity, price });
      res.status(201).json(item);
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { id } = req.params;
      await CartService.removeItem(id);
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.userId
      const items = await CartService.getCart(userId);
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId
      const { quantity } = req.body;
      const item = await CartService.updateItem(id, userId, quantity);
      res.status(200).json(item);
    } catch (error) {
      console.error('Error updating item in cart:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};