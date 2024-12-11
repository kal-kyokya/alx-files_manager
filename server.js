import express from 'express';
import index from './routes/index';

// Creating an instance of an Express appliction
const app = express();

const PORT = process.env.port || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Using the imported routes
app.use('/api', index);

// Startting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
