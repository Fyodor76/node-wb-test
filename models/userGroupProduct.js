// models/userGroupProduct.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class UserGroupProduct extends Model {}

UserGroupProduct.init({
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
  groupProductId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'GroupProducts',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserGroupProduct',
  tableName: 'UserGroupProducts',
});
