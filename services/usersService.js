import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { UserCategory } from '../models/userCategory.js';
import { UserGroupProduct } from '../models/userGroupProduct.js';
import { Category } from '../models/categories.js';
import { GroupProduct } from '../models/groupProduct.js';

export const UserService = {
  register: async ({ username, password, email, profilePicture }) => {
    try {
      const existingUserByUsername = await User.findOne({ where: { username } });
      if (existingUserByUsername) {
        throw new Error('Username already exists');
      }

      const existingUserByEmail = await User.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        profilePicture,
      });

      return newUser;
    } catch (error) {
      console.error('Error in UserService.register:', error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error('Error in UserService.findById:', error);
      throw error;
    }
  },

  findByUsername: async (username) => {
    try {
      console.log("user")
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (error) {
      console.error('Error in UserService.findByUsername:', error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error in UserService.findByEmail:', error);
      throw error;
    }
  },

  validatePassword: async (password, hashedPassword) => {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error in UserService.validatePassword:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error in UserService.getAllUsers:', error);
      throw error;
    }
  },

  updateProfilePicture: async (userId, profilePictureUrl) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.profilePicture = profilePictureUrl;
      await user.save();

      return user;
    } catch (error) {
      console.error('Error in UserService.updateProfilePicture:', error);
      throw error;
    }
  },

  addUserCategory: async (userId, categoryId) => {
    try {
      const userCategory = await UserCategory.create({ userId, categoryId });
      return userCategory;
    } catch (error) {
      console.error('Error in UserService.addUserCategory:', error);
      throw error;
    }
  },

  addUserGroupProduct: async (userId, groupProductId) => {
    try {
      const userGroupProduct = await UserGroupProduct.create({ userId, groupProductId });
      return userGroupProduct;
    } catch (error) {
      console.error('Error in UserService.addUserGroupProduct:', error);
      throw error;
    }
  },

  getUserCategories: async (userId) => {
    try {
      const categories = await UserCategory.findAll({ where: { userId }, include: Category });
      return categories;
    } catch (error) {
      console.error('Error in UserService.getUserCategories:', error);
      throw error;
    }
  },

  getUserGroupProducts: async (userId) => {
    try {
      const groupProducts = await UserGroupProduct.findAll({ where: { userId }, include: GroupProduct });
      return groupProducts;
    } catch (error) {
      console.error('Error in UserService.getUserGroupProducts:', error);
      throw error;
    }
  },

  updateProfile: async (userId, updatedData) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      Object.assign(user, updatedData);
      await user.save();
      return user;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};