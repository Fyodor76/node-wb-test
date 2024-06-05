// services/recommendationService.js
import { Recommendation } from '../models/recommendation.js';

export const RecommendationService = {
  addRecommendation: async ({ userId, categoryId, groupProductId }) => {
    try {
      const recommendation = await Recommendation.create({ userId, categoryId, groupProductId });
      return recommendation;
    } catch (error) {
      console.error('Error adding recommendation:', error.message);
      throw new Error('Internal server error');
    }
  },

  getRecommendations: async (userId) => {
    try {
      const recommendations = await Recommendation.findAll({
        where: { userId },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: GroupProduct, attributes: ['id', 'name'] }
        ]
      });
      return recommendations;
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      throw new Error('Internal server error');
    }
  },

  removeRecommendation: async (id) => {
    try {
      const recommendation = await Recommendation.findByPk(id);
      if (!recommendation) {
        throw new Error('Recommendation not found');
      }
      await recommendation.destroy();
    } catch (error) {
      console.error('Error removing recommendation:', error.message);
      throw new Error('Internal server error');
    }
  }
};
