import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class GroupProduct extends Model {}

GroupProduct.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'GroupProduct',
  tableName: 'GroupProducts',
});
