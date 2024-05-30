import Category from '../models/category.js';
import Question from '../models/question.js';
import Answer from '../models/answer.js';

const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  getCategoryById: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      const questions = await Question.find({ category: categoryId }).populate('category');
      res.status(200).json({ category, questions });
    } catch (error) {
      console.error('Error fetching category data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getQuestionsByCategoryId: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const questions = await Question.find({ category: categoryId }).populate('category');
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAnswersByQuestionId: async (req, res) => {
    const { questionId } = req.params;
    try {
      const answers = await Answer.find({ question: questionId });
      res.status(200).json(answers);
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default CategoryController;
