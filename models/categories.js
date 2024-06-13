import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class Category extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         name: 'Electronics'
 *         description: 'Electronic devices and gadgets'
 */
Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'Categories',
});