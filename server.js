import express from 'express';
import addRoutes './routes/index';

// Creating an instance of an Express appliction
const app = express();

const PORT = process.env.port || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Creating a router and passing it to `addRoutes`
addRoutes(app);

// Startting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
