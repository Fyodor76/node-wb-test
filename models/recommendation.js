import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class Recommendation extends Model {}

Recommendation.init({
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
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
  groupProductId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'GroupProducts',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Recommendation',
  tableName: 'Recommendations',
});