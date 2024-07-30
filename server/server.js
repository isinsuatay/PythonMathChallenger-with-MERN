import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import questionRoutes from './routes/questionRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { runCode } from './controllers/codeController.js';
import userRoutes from './routes/userRoutes.js'; 
import { createUser } from './api/createUser.js';
import { acquireSessionToken } from './api/acquireSessionToken.js';
import { initializeUser } from './api/initializeUser.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mathApp', {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error('MongoDB connection error:', error));

// Endpoint definitions
app.post('/run-code', runCode);
app.use('/questions', questionRoutes);
app.use('/categories', categoryRoutes);
app.use('/api/users', userRoutes); // Use the imported userRoutes
app.post('/api/createUser', createUser);
app.post('/api/acquireSessionToken', acquireSessionToken);
app.post('/api/initializeUser', initializeUser);
app.use('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});

// Static file path settings for serving frontend files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './dist')));

// Redirect all other GET requests to the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
