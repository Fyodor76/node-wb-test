// controllers/categoryController.js
import {CategoryService} from "../services/categoriesService.js"

export const CategoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      const category = await CategoryService.createCategory({ name, description });
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await CategoryService.updateCategory(id, { name, description });
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(id);
      res.status(200).json({ message: 'Category deleted successfully', category });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getUserCategories: async (req, res) => {
    try {
      const { userId } = req.params;
      const categories = await CategoryService.getUserCategories(userId);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching user categories:', error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
