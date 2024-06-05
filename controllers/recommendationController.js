// controllers/recommendationController.js
import { RecommendationService } from '../services/recommendationService.js';

export const RecommendationController = {
  addRecommendation: async (req, res) => {
    try {
      const { userId, categoryId, groupProductId } = req.body;
      const recommendation = await RecommendationService.addRecommendation({ userId, categoryId, groupProductId });
      res.status(201).json(recommendation);
    } catch (error) {
      console.error('Error adding recommendation:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getRecommendations: async (req, res) => {
    try {
      const { userId } = req.params;
      const recommendations = await RecommendationService.getRecommendations(userId);
      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  removeRecommendation: async (req, res) => {
    try {
      const { id } = req.params;
      await RecommendationService.removeRecommendation(id);
      res.status(200).json({ message: 'Recommendation removed successfully' });
    } catch (error) {
      console.error('Error removing recommendation:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};