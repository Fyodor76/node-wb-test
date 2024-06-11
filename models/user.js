// models/user.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import bcrypt from 'bcrypt';

export class User extends Model {
  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  static async findByUsername(username) {
    return await this.findOne({ where: { username } });
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         address:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         profilePicture:
 *           type: string
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         username: 'johndoe'
 *         firstName: 'John'
 *         lastName: 'Doe'
 *         address: '123 Main St'
 *         password: 'password123'
 *         email: 'johndoe@example.com'
 *         profilePicture: 'http://example.com/profile.jpg'
 */
User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
});