import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class Order extends Model {}

Order.init({
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'success',
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'Orders',
});
