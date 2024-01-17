import express from 'express';
import {
  deletePost,
  getFeedPosts,
  getPost,
  getUserPosts,
  likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:postId', verifyToken, getPost);
router.get('/:userId/posts', verifyToken, getUserPosts);

// UPDATE
router.patch('/:id/like', verifyToken, likePost);

// DELETE
router.delete('/:id', verifyToken, deletePost);

export default router;
