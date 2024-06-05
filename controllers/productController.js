import { upload } from '../middlewares/upload.js';
import { ProductService } from '../services/productService.js';

export const ProductController = {
  createProduct: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, description, price, groupProductId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await ProductService.createProduct({ name, description, price, groupProductId, imageUrl });
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