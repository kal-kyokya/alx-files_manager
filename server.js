import express from 'express';
import addRoutes from './routes/index';

// Create an Express application instance
const app = express();

const PORT = process.env.port || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes by manipulating app instance
addRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
