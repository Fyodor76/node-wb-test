import { Op } from 'sequelize';
import { upload } from '../middlewares/upload.js';
import { GroupProduct } from '../models/groupProduct.js';
import { Product } from '../models/product.js';
import { Recommendation } from '../models/recommendation.js';
import { ProductService } from '../services/productService.js';

export const ProductController = {
  createProduct: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, description, price, groupProductId, rate } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await ProductService.createProduct({ name, description, price, groupProductId, imageUrl, rate });
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],

  getProducts: async (req, res) => {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const { query, group } = req.query;
      const whereClause = {};

      console.log(query, 'query')
      console.log(group, 'group')
      if (query) {
        whereClause.name = {
          [Op.iLike]: `%${query}%`
        };
      }


      if (group) {
        whereClause.groupProductId = group;
      }

      const products = await Product.findAll({
        where: whereClause
      });

      res.status(200).json(products);
    } catch (error) {
      console.error('Error searching products:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProduct: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name, description, price, groupProductId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const product = await ProductService.updateProduct(id, { name, description, price, groupProductId, imageUrl });
        res.status(200).json(product);
      } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],

  getProductsByRecommendations: async (req, res) => {
    console.log('rsdaadsdasads')
    try {
      const userId = req.userId;
      const recommendations = await Recommendation.findAll({
        where: { userId },
        include: [
          {
            model: GroupProduct,
            include: [Product]
          }
        ]
      });
      console.log(recommendations, 'recc')

      const products = recommendations
        .flatMap(recommendation => recommendation.GroupProduct.Products);

      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products by recommendations:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};