import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createReport, getReports } from '../controllers/reports.js';

const router = express.Router();

// READ
router.get('/', getReports);

// CREATE
router.post('/', verifyToken, createReport);

export default router;
