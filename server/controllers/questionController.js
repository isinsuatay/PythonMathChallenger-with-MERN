import Question from '../models/question.js';
import Answer from '../models/answer.js';

const QuestionController = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await Question.find().populate('category');
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const question = await Question.findById(questionId).populate('category');
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      const answers = await Answer.find({ question: questionId });
      res.json({ question, answers });
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAnswersByQuestionId: async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const answers = await Answer.find({ question: questionId });
      res.json(answers);
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default QuestionController;
