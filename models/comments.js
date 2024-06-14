import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Product } from './product.js';

export class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments',
});



