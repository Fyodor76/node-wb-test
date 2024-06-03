import { GroupProduct } from '../models/groupProduct.js';

export const GroupProductService = {
  createGroupProduct: async ({ name, description, price, categoryId, imageUrl }) => {
    try {
      const product = await GroupProduct.create({ name, description, price, categoryId, imageUrl });
      return product;
    } catch (error) {
      console.error('Error creating product:', error.message);
      throw new Error('Internal server error');
    }
  },

  getGroupProducts: async () => {
    try {
      const products = await GroupProduct.findAll();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new Error('Internal server error');
    }
  },

  getGroupProductById: async (id) => {
    try {
      const product = await GroupProduct.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error.message);
      throw new Error('Internal server error');
    }
  },

  updateGroupProduct: async (id, { name, description, price, categoryId, imageUrl }) => {
    try {
      const product = await GroupProduct.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      product.name = name !== undefined ? name : product.name;
      product.description = description !== undefined ? description : product.description;
      product.price = price !== undefined ? price : product.price;
      product.categoryId = categoryId !== undefined ? categoryId : product.categoryId;
      product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
      await product.save();
      return product;
    } catch (error) {
      console.error('Error updating product:', error.message);
      throw new Error('Internal server error');
    }
  },

  deleteGroupProduct: async (id) => {
    try {
      const product = await GroupProduct.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      await product.destroy();
      return product;
    } catch (error) {
      console.error('Error deleting product:', error.message);
      throw new Error('Internal server error');
    }
  }
};
