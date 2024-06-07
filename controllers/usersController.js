// controllers/userController.js
import { UserService } from '../services/usersService.js'
import { upload } from '../middlewares/upload.js';

export const UsersController = {
  register: [
    upload.single('profilePicture'),
    async (req, res) => {
      console.log(req.body, 'req.body')
      try {
        const { username, password, email } = req.body;
        const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newUser = await UserService.register({ username, password, email, profilePicture: profilePictureUrl });
        res.cookie('isAuth', 'true', { httpOnly: false, secure: true, sameSite: 'None' });
        res.cookie('userId', newUser.id, { httpOnly: false, secure: true, sameSite: 'None' });
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error registering user:', error.message);
        if (error.message === 'Username already exists' || error.message === 'Email already exists') {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Internal server error' });
        }
      }
    }
  ],

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body, 'req.boy!!!!')
      console.log(username, 'userName')
      const user = await UserService.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      const isPasswordValid = await UserService.validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.cookie('isAuth', 'true', { httpOnly: false, secure: true, sameSite: 'None' });
      res.cookie('userId', user.id, { httpOnly: false, secure: true, sameSite: 'None' });
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.status(200).json({ message: 'User logged in successfully', user: userWithoutPassword });
    } catch (error) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie('isAuth');
      res.clearCookie('userId');
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error logging out user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.cookies;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const user = await UserService.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  uploadProfilePicture: [
    upload.single('profilePicture'),
    async (req, res) => {
      try {
        const userId = req.body.userId; // Или получить из авторизации
        const profilePictureUrl = `/uploads/${req.file.filename}`;
        const user = await UserService.updateProfilePicture(userId, profilePictureUrl);
        res.status(200).json({ message: 'Profile picture updated successfully', user });
      } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],

  addUserCategory: async (req, res) => {
    try {
      const { userId, categoryId } = req.body;
      const userCategory = await UserService.addUserCategory(userId, categoryId);
      res.status(201).json(userCategory);
    } catch (error) {
      console.error('Error adding user category:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addUserGroupProduct: async (req, res) => {
    try {
      const { userId, groupProductId } = req.body;
      const userGroupProduct = await UserService.addUserGroupProduct(userId, groupProductId);
      res.status(201).json(userGroupProduct);
    } catch (error) {
      console.error('Error adding user group product:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserCategories: async (req, res) => {
    try {
      const { userId } = req.params;
      const categories = await UserService.getUserCategories(userId);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching user categories:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserGroupProducts: async (req, res) => {
    try {
      const { userId } = req.params;
      const groupProducts = await UserService.getUserGroupProducts(userId);
      res.status(200).json(groupProducts);
    } catch (error) {
      console.error('Error fetching user group products:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProfile: [
    upload.single('profilePicture'),
    async (req, res) => {
      try {
        const { userId } = req.cookies;
        const { firstName, lastName, address, username, email } = req.body;
        console.log(req.body, 'req.body!!!')
        const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedData = {
          firstName,
          lastName,
          address,
          username,
          email,
          profilePicture: profilePictureUrl,
        };

        Object.keys(updatedData).forEach(
          key => updatedData[key] === undefined && delete updatedData[key]
        );

        const updatedUser = await UserService.updateProfile(userId, updatedData);
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
      } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ],
};