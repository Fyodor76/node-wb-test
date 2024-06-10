// services/recommendationService.js
import { sequelize } from '../database.js';
import { Category } from '../models/categories.js';
import { GroupProduct } from '../models/groupProduct.js';
import { Recommendation } from '../models/recommendation.js';

export const RecommendationService = {
  async existsRecommendation(userId, categoryId, groupProductId) {
    return await Recommendation.findOne({
      where: {
        userId,
        categoryId,
        groupProductId,
      },
    });
  },

  async addRecommendation({ userId, categoryId, groupProductId }) {
    const existingRecommendation = await this.existsRecommendation(userId, categoryId, groupProductId);
    if (existingRecommendation) {
      return existingRecommendation;
    }
    return await Recommendation.create({ userId, categoryId, groupProductId });
  },

  async getRecommendations(userId) {
    const recommendations = await Recommendation.findAll({
      where: { userId },
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: GroupProduct, attributes: ['id', 'name'] }
      ],
    });

    const formattedRecommendations = recommendations.reduce((acc, recommendation) => {
      const categoryId = recommendation.Category.id;
      const groupProductId = recommendation.GroupProduct.id;

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(groupProductId);

      return acc;
    }, {});

    return formattedRecommendations;
  },

  async saveRecommendations(userId, recommendations) {
    // Begin transaction
    const transaction = await sequelize.transaction();

    try {
      // Remove existing recommendations for the user
      await Recommendation.destroy({ where: { userId }, transaction });

      // Add new recommendations
      for (const [categoryId, groupIds] of Object.entries(recommendations)) {
        for (const groupProductId of groupIds) {
          await Recommendation.create({ userId, categoryId, groupProductId }, { transaction });
        }
      }

      // Commit transaction
      await transaction.commit();
    } catch (error) {
      // Rollback transaction in case of error
      await transaction.rollback();
      console.error('Error saving recommendations:', error.message);
      throw new Error('Internal server error');
    }
  },

  async removeRecommendation(id) {
    return await Recommendation.destroy({
      where: { id },
    });
  },
};
