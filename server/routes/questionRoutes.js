import express from 'express';
import QuestionController from '../controllers/questionController.js';

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);
router.get('/:questionId', QuestionController.getQuestionById);
router.get('/:questionId/answers', QuestionController.getAnswersByQuestionId); 

export default router;
