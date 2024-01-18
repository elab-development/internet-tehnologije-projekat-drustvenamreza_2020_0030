import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createBan, getBans } from '../controllers/bans.js';

const router = express.Router();

// READ
router.get('/', getBans);

// CREATE
router.post('/', verifyToken, createBan);

export default router;
