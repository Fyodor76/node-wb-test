import { Comment } from "../models/comments.js";
import { User } from "../models/user.js";

export const CommentService = {
    addComment: async ({ content, productId, userId }) => {
        const comment = await Comment.create({ content, productId, userId });
        const user = await User.findByPk(userId, {
          attributes: ['id', 'username', 'profilePicture'],
        });
        return { ...comment.toJSON(), User: user };
      },

  deleteComment: async (id) => {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    await comment.destroy();
  },

  getCommentsByProductId: async (productId) => {
    return await Comment.findAll({
      where: { productId },
      include: [
        { model: User, attributes: ['id', 'username', 'profilePicture'] },
      ],
    });
  }
};
