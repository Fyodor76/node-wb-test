// models/userCategory.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class UserCategory extends Model {}

UserCategory.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserCategory',
  tableName: 'UserCategories',
});
