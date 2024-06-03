import { CartItem } from "../models/cartItems.js";

export const CartService = {
  addItem: async ({ userId, productId, quantity, price }) => {
    try {
      const item = await CartItem.create({ userId, productId, quantity, price });
      return item;
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  removeItem: async (id) => {
    try {
      await CartItem.destroy({ where: { id } });
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  getCart: async (userId) => {
    try {
      const items = await CartItem.findAll({ where: { userId } });
      return items;
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  updateItem: async (id, quantity) => {
    try {
      const item = await CartItem.findByPk(id);
      if (!item) {
        throw new Error('Item not found');
      }
      item.quantity = quantity;
      await item.save();
      return item;
    } catch (error) {
      console.error('Error updating item in cart:', error.message);
      throw new Error(error.message);
    }
  }
};
