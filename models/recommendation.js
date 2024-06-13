import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export class Recommendation extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Recommendation:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         categoryId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         groupProductId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         userId: '123e4567-e89b-12d3-a456-426614174000'
 *         categoryId: '123e4567-e89b-12d3-a456-426614174000'
 *         groupProductId: '123e4567-e89b-12d3-a456-426614174000'
 */
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