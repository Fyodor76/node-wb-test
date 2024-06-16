import { Op, Sequelize } from 'sequelize';
import { upload } from '../middlewares/upload.js';
import { GroupProduct } from '../models/groupProduct.js';
import { Product } from '../models/product.js';
import { Recommendation } from '../models/recommendation.js';
import { ProductService } from '../services/productService.js';
import { RecommendationService } from '../services/recommendationService.js';
import { OrderItem } from '../models/orderItem.js';
import { sequelize } from '../database.js';
import { addCommentsNumber } from '../helpers/addCommentsNumber.js';

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
      const userId = req.userId;
      const { query, group, priceFrom, priceTo, recommended, popular, rate } = req.query;
  
      if (!Object.keys(req.query)?.length) {
        const products = await ProductService.getProducts();
        return res.status(200).json(products);
      }
  
      let whereClause = {};
  
      if (query) {
        whereClause.name = {
          [Op.iLike]: `%${query}%`
        };
      }
  
      if (group) {
        whereClause.groupProductId = group;
      }
  
      if (priceFrom) {
        whereClause.price = { [Op.gte]: priceFrom };
      }
  
      if (priceTo) {
        whereClause.price = whereClause.price ? { ...whereClause.price, [Op.lte]: priceTo } : { [Op.lte]: priceTo };
      }
  
      if (rate) {
        whereClause.rate = { [Op.gte]: rate };
      }
  
      let finalProducts = [];
  
      if (recommended === 'true' && userId) {
        const recommendations = await RecommendationService.getRecommendations(userId);
        const groupProductIds = Object.values(recommendations).flat();
  
        if (groupProductIds.length > 0) {
          const recommendedProducts = await Product.findAll({
            where: {
              groupProductId: {
                [Op.in]: groupProductIds
              }
            }
          });
  
          if (recommendedProducts.length > 0) {
            finalProducts = recommendedProducts;
            whereClause.id = {
              [Op.in]: recommendedProducts.map(p => p.id)
            };
          } else {
            return res.status(200).json([]);
          }
        } else {
          return res.status(200).json([]);
        }
      }
  
      if (popular === 'true' && userId) {
        const recommendations = await RecommendationService.getRecommendations(userId);
        const groupProductIds = Object.values(recommendations).flat();
  
        if (groupProductIds.length > 0) {
          const popularProductIds = await sequelize.query(
            `SELECT "Product"."id"
             FROM "Products" AS "Product"
             JOIN "OrderItems" AS "OrderItem" ON "Product"."id" = "OrderItem"."productId"
             WHERE "Product"."groupProductId" IN (:groupProductIds)
             GROUP BY "Product"."id"
             ORDER BY SUM("OrderItem"."quantity") DESC`,
            {
              replacements: { groupProductIds },
              type: Sequelize.QueryTypes.SELECT,
            }
          );
  
          const popularProductIdsArray = popularProductIds.map(p => p.id);
  
          if (popularProductIdsArray.length > 0) {
            const popularProducts = await Product.findAll({
              where: {
                id: {
                  [Op.in]: popularProductIdsArray
                }
              }
            });
  
            finalProducts = popularProducts;
            whereClause.id = {
              [Op.in]: popularProductIdsArray
            };
          } else {
            return res.status(200).json([]);
          }
        } else {
          return res.status(200).json([]);
        }
      }
  
      if (finalProducts.length === 0) {
        finalProducts = await Product.findAll({
          where: whereClause
        });
      } else {
        const additionalFilteredProducts = await Product.findAll({
          where: whereClause
        });
  
        finalProducts = finalProducts.filter(product => 
          additionalFilteredProducts.some(filteredProduct => filteredProduct.id === product.id)
        );
      }
      const productsWithComments = await Promise.all(finalProducts.map(addCommentsNumber));

      return res.status(200).json(productsWithComments);
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