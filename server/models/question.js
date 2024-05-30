import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  definition: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default model('Question', QuestionSchema);
