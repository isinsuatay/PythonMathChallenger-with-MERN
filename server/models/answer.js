import { Schema, model } from 'mongoose';

const AnswerSchema = new Schema({
  answer: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },

});

export default model('Answer', AnswerSchema);
