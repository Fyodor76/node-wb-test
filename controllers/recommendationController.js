// controllers/recommendationController.js
import { RecommendationService } from '../services/recommendationService.js';

export const RecommendationController = {
  addRecommendation: async (req, res) => {
    try {
      const userId = req.userId; 
      const { categoryId, groupProductId } = req.body;
      const recommendation = await RecommendationService.addRecommendation({ userId, categoryId, groupProductId });
      res.status(201).json(recommendation);
    } catch (error) {
      console.error('Error adding recommendation:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getRecommendations: async (req, res) => {
    try {
      const userId = req.userId;
      const recommendations = await RecommendationService.getRecommendations(userId);
      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  saveRecommendations: async (req, res) => {
    try {
      const userId = req.userId;
      const recommendations = req.body;
      await RecommendationService.saveRecommendations(userId, recommendations);
      res.status(200).json({ message: 'Recommendations saved successfully' });
    } catch (error) {
      console.error('Error saving recommendations:', error.message);
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
  },
};