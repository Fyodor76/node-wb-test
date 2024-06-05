import { Category } from '../models/categories.js';
import { GroupProduct } from '../models/groupProduct.js';
import { Product } from '../models/product.js';
import { UserCategory } from '../models/userCategory.js';

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

      // Найти все группы продуктов, связанные с категорией
      const groupProducts = await GroupProduct.findAll({ where: { categoryId: id } });

      // Удалить все продукты, связанные с каждой группой продуктов
      for (const groupProduct of groupProducts) {
        await Product.destroy({ where: { groupProductId: groupProduct.id } });
      }

      // Удалить все группы продуктов, связанные с категорией
      await GroupProduct.destroy({ where: { categoryId: id } });

      // Удалить категорию
      await category.destroy();

      return category;
    } catch (error) {
      console.error('Error deleting category:', error.message);
      throw new Error('Internal server error');
    }
  },

  getUserCategories: async (userId) => {
    try {
      const userCategories = await UserCategory.findAll({ where: { userId }, include: Category });
      const categories = userCategories.map(uc => uc.Category);
      return categories;
    } catch (error) {
      console.error('Error fetching user categories:', error.message);
      throw new Error('Internal server error');
    }
  },
};
