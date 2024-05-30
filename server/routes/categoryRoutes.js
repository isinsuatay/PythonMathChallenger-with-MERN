import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:categoryId', CategoryController.getCategoryById);
router.get('/:categoryId/questions', CategoryController.getQuestionsByCategoryId);
router.get('/:categoryId/questions/:questionId/answers', CategoryController.getAnswersByQuestionId);

export default router;
