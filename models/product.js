import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class Product extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - groupProductId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: decimal
 *         groupProductId:
 *           type: string
 *           format: uuid
 *         imageUrl:
 *           type: string
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         name: 'iPhone 13'
 *         description: 'Latest Apple smartphone'
 *         price: 999.99
 *         rate: 4
 *         groupProductId: '123e4567-e89b-12d3-a456-426614174000'
 *         imageUrl: 'http://example.com/iphone13.jpg'
 */
Product.init({
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  groupProductId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'GroupProducts',
      key: 'id',
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  },
  commentsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'Products',
});