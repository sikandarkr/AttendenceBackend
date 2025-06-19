// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const attendenceRoutes = require('./routes/attendance');

const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const logger = require('./utils/logger');
const classesRoutes = require('./routes/classes');

const authRoutes = require('./routes/auth');
dotenv.config(); // Load environment variables from .env

// Initialize Express app
const app = express();



// Middleware
const allowedOrigins = [
  'https://qualitytechlab.com', // Your frontend domain
  'http://localhost:3000'       // For local development
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));



app.use(express.json()); // Use express built-in JSON middleware


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendenceRoutes);

app.use('/api/teachers', teacherRoutes);

app.use('/api/classes', classesRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on http://0.0.0.0:${PORT}`);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { message: err.message, stack: err.stack });
  process.exit(1); // Optional: restart via PM2 or systemd
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason });
});