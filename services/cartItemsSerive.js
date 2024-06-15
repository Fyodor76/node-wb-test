import { where } from "sequelize";
import { CartItem } from "../models/cartItems.js";
import { Product } from "../models/product.js";

export const CartService = {
  addItem: async ({ userId, productId, quantity, price }) => {
    try {
      const existingItem = await CartItem.findOne({ where: { userId, productId } });
      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
        return existingItem;
      } else {
        const item = await CartItem.create({ userId, productId, quantity, price });
        return item;
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  removeItem: async (id) => {
    try {
      const item = await CartItem.findByPk(id);
      if (!item) {
        throw new Error('Item not found');
      }
      await item.destroy();
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  getCart: async (userId) => {
    try {
      const items = await CartItem.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: 'Product',
            attributes: ['name', 'imageUrl']
          }
        ]
      });
      return items;
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      throw new Error('Internal server error');
    }
  },

  updateItem: async (id, userId, quantity) => {
    try {
      const item = await CartItem.findOne({
        where: {
          id: id,
          userId: userId
        },
        include: [
          {
            model: Product,
            as: 'Product',
            attributes: ['name', 'imageUrl']
          }
        ]
      });
  
      if (!item) {
        throw new Error('Item not found');
      }
  
      item.quantity = quantity;
      await item.save();
      return item;
    } catch (error) {
      console.error('Error updating item in cart:', error.message);
      throw new Error('Internal server error');
    }
  }
};