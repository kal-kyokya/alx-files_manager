import express from 'express';
import addRoutes from './routes/index';

// Creating an instance of an Express appliction
const app = express();

const PORT = process.env.port || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Settting up routes by passing app instance to addRoutes function
addRoutes(app);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
