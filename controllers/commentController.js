import { Comment } from "../models/comments.js";
import { User } from "../models/user.js";
import { CommentService } from "../services/commentService.js";

export const CommentController = {
  addComment: async (req, res) => {
    try {
      const { content, productId } = req.body;
      const userId = req.userId;
      const comment = await CommentService.addComment({ content, productId, userId });
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      await CommentService.deleteComment(id);
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getCommentsByProductId: async (req, res) => {
    try {
      const { productId } = req.params;
      const comments = await CommentService.getCommentsByProductId(productId)
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll()
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
