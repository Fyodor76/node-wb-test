import multer from 'multer';
import { UserService } from '../services/usersService.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

export const UsersController = {
  register: [
    upload.single('profilePicture'),
    async (req, res) => {
      try {
        const { username, password, email } = req.body;
        const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;
        console.log(profilePictureUrl, 'praarssa')
        const newUser = await UserService.register({ username, password, email, profilePicture: profilePictureUrl });
        res.cookie('user', JSON.stringify({ id: newUser.id, username: newUser.username }), { httpOnly: true });
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
      const user = await UserService.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      const isPasswordValid = await UserService.validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.cookie('user', JSON.stringify({ id: user.id, username: user.username }), { httpOnly: true });
      res.cookie('isAuthenticated', true, { httpOnly: true });
      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie('user');
      res.clearCookie('isAuthenticated');
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error logging out user:', error.message);
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
  ]
};
