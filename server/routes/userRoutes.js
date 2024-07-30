import express from 'express';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.getCurrentUser);
router.get('/:userId', authMiddleware, UserController.getUser);

export default router;
