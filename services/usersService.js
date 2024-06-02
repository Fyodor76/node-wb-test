import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const UserService = {
  register: async ({ username, password, email, profilePicture }) => {
    try {
      const existingUserByUsername = await User.findOne({ where: { username } });
      if (existingUserByUsername) {
        throw new Error('Username already exists');
      }

      console.log(profilePicture, 'profile picture in service')

      const existingUserByEmail = await User.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        profilePicture
      });

      return newUser;
    } catch (error) {
      console.error('Error in UserService.register:', error);
      throw error;
    }
  },

  findByUsername: async (username) => {
    try {
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
  }
};
