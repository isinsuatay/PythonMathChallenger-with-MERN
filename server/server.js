import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { runCode } from './controllers/codeController.js';
import path from 'path';
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/mathApp');


mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
});

app.post('/run-code', runCode);
app.use('/questions', questionRoutes);
app.use('/categories', categoryRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
