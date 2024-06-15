import { Comment } from '../models/comments.js';
import { Product } from '../models/product.js';

const addCommentsNumber = async (product) => {
  const commentsCount = await Comment.count({ where: { productId: product.id } });
  return {
    ...product.get({ plain: true }),
    commentsNumber: commentsCount,
  };
};

export const ProductService = {
  createProduct: async ({ name, description, price, groupProductId, imageUrl, rate }) => {
    try {
      const product = await Product.create({ name, description, price, groupProductId, imageUrl, rate });
      return product;
    } catch (error) {
      console.error('Error creating product:', error.message);
      throw new Error('Internal server error');
    }
  },

  getProducts: async () => {
    try {
      const products = await Product.findAll();
      const productsWithComments = await Promise.all(products.map(addCommentsNumber));
      return productsWithComments;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new Error('Internal server error');
    }
  },

  getProductById: async (id) => {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return addCommentsNumber(product);
    } catch (error) {
      console.error('Error fetching product:', error.message);
      throw new Error('Internal server error');
    }
  },

  updateProduct: async (id, { name, description, price, groupProductId, imageUrl }) => {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      product.name = name !== undefined ? name : product.name;
      product.description = description !== undefined ? description : product.description;
      product.price = price !== undefined ? price : product.price;
      product.groupProductId = groupProductId !== undefined ? groupProductId : product.groupProductId;
      product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
      await product.save();
      return addCommentsNumber(product);
    } catch (error) {
      console.error('Error updating product:', error.message);
      throw new Error('Internal server error');
    }
  },

  deleteProduct: async (id) => {
    try {
      const product = await Product.findByPk(id);
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