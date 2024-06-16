import { CartItem } from '../models/cartItems.js';
import { OrderItem } from '../models/orderItem.js';
import { Order } from '../models/orders.js';
import { Product } from "../models/product.js";

export const OrderService = {
  createOrder: async ({ userId }) => {
    try {
      // Получаем все элементы корзины для пользователя
      const cartItems = await CartItem.findAll({ where: { userId } });
      if (!cartItems.length) {
        throw new Error('Cart is empty');
      }

      // Рассчитываем общую сумму заказа
      const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.quantity * item.price);
      }, 0);

      // Создаем заказ
      const order = await Order.create({
        userId,
        totalAmount,
        status: 'success',
      });

      // Создаем записи в OrderItems для каждого товара в корзине
      for (const item of cartItems) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
      }

      // Удаляем элементы из корзины после создания заказа
      await CartItem.destroy({ where: { userId } });

      return order;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw new Error('Internal server error');
    }
  },

  getCompletedOrders: async ({ userId }) => {
    try {
      const orders = await Order.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: OrderItem,
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name', 'description', 'price', 'imageUrl'] 
              }
            ]
          }
        ]
      });

      return orders;
    } catch (error) {
      console.error('Error fetching completed orders:', error.message);
      throw new Error('Internal server error');
    }
  }
};
