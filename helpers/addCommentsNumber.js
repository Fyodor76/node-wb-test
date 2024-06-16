import { Comment } from "../models/comments.js";

export const addCommentsNumber = async (product) => {
    const commentsCount = await Comment.count({ where: { productId: product.id } });
    return {
      ...product.get({ plain: true }),
      commentsNumber: commentsCount,
    };
  };