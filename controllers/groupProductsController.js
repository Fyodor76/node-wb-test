import { upload } from "../middlewares/upload.js";
import { GroupProductService } from "../services/groupProductService.js";

export const GroupProductController = {
  createGroupProduct: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, description, price, categoryId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await GroupProductService.createGroupProduct({ name, description, price, categoryId, imageUrl });
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],

  getGroupProducts: async (req, res) => {
    try {
      const products = await GroupProductService.getGroupProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getGroupProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await GroupProductService.getGroupProductById(id);
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateGroupProduct: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const product = await GroupProductService.updateGroupProduct(id, { name, description, price, categoryId, imageUrl });
        res.status(200).json(product);
      } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],

  deleteGroupProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await GroupProductService.deleteGroupProduct(id);
      res.status(200).json({ message: 'GroupProduct deleted successfully', product });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
