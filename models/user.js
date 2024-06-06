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
