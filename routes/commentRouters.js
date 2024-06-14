import { Router } from 'express';
import authenticate from '../middlewares/isAuth.js';
import { CommentController } from '../controllers/commentController.js';

export const commentRouter = Router();

commentRouter.get('/', CommentController.getAllComments);
commentRouter.post('/add', authenticate, CommentController.addComment);
commentRouter.delete('/:id', authenticate, CommentController.deleteComment);
commentRouter.get('/product/:productId', CommentController.getCommentsByProductId);
