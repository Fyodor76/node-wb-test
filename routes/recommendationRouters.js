import express from 'express';
import { RecommendationController } from '../controllers/recommendationController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerRecommendation = express.Router();

routerRecommendation.post('/', authenticate, RecommendationController.addRecommendation);
routerRecommendation.get('/', authenticate, RecommendationController.getRecommendations);
routerRecommendation.delete('/:id', authenticate, RecommendationController.removeRecommendation);
