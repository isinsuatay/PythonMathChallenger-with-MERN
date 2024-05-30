import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
});

export default model('Category', CategorySchema);
