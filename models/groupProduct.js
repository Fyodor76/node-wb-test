import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class GroupProduct extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupProduct:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         categoryId:
 *           type: string
 *           format: uuid
 *         imageUrl:
 *           type: string
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         name: 'Smartphones'
 *         description: 'All kinds of smartphones'
 *         categoryId: '123e4567-e89b-12d3-a456-426614174000'
 *         imageUrl: 'http://example.com/smartphones.jpg'
 */
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