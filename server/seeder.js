import mongoose from 'mongoose';
import fs from 'fs/promises';
import Category from './models/category.js';
import Answer from './models/answer.js';
import Question from './models/question.js';

mongoose.connect('mongodb://localhost:27017/mathApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const readJSONFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return [];
  }
};

const checkIfDataExists = async (Model, data) => {
  const existingData = await Model.findOne(data);
  return !!existingData;
};

const insertDataToDatabase = async (categoryName, answerFilePath, questionFilePath) => {
  try {
    let category = await Category.findOne({ name: categoryName });

    if (!category) {
      category = await Category.create({ name: categoryName });
    }

    const answersData = await readJSONFile(answerFilePath);
    const questionsData = await readJSONFile(questionFilePath);

    const answers = [];
    const questions = [];

    for (const answerData of answersData) {
      const question = await Question.findOne({ question: answerData.question });
      if (question) {
        const answerExists = await checkIfDataExists(Answer, { answer: answerData.answer, question: question._id });
        if (!answerExists) {
          answers.push({ answer: answerData.answer, question: question._id });
        }
      } else {
        console.log(`Question not found: ${answerData.question}`);
      }
    }

    for (const questionData of questionsData) {
      const questionExists = await checkIfDataExists(Question, { question: questionData.question });
      if (!questionExists) {
        const question = new Question({
          question: questionData.question,
          definition: questionData.definition,
          description: questionData.description,
          category: category._id,
        });
        questions.push(question);
      }
    }

    await Answer.insertMany(answers);
    await Question.insertMany(questions);

    category.answers = answers.map(answer => answer._id);
    category.questions = questions.map(question => question._id);
    await category.save();

    console.log(`Data added to ${categoryName} category.`);
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

insertDataToDatabase('mathematics', './files/mathematics-answers.json', './files/mathematics-questions.json');
insertDataToDatabase('algorithms', './files/algorithms-answers.json', './files/algorithms-questions.json');