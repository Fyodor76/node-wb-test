import { Category } from "../models/categories.js";

export const CategoryService = {
  createCategory: async ({ name, description }) => {
    try {
      const category = await Category.create({ name, description });
      return category;
    } catch (error) {
      console.error('Error creating category:', error.message);
      throw new Error('Internal server error');
    }
  },

  getCategories: async () => {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw new Error('Internal server error');
    }
  },

  getCategoryById: async (id) => {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      console.error('Error fetching category:', error.message);
      throw new Error('Internal server error');
    }
  },

  updateCategory: async (id, { name, description }) => {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      category.name = name !== undefined ? name : category.name;
      category.description = description !== undefined ? description : category.description;
      await category.save();
      return category;
    } catch (error) {
      console.error('Error updating category:', error.message);
      throw new Error('Internal server error');
    }
  },

  deleteCategory: async (id) => {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      await category.destroy();
      return category;
    } catch (error) {
      console.error('Error deleting category:', error.message);
      throw new Error('Internal server error');
    }
  }
};