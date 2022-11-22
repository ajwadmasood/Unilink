require('dotenv').config();
require('express-async-errors');
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger
//const swaggerUI = require('swagger-ui-express');
//const YAML = require('yamljs');
//const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const mongoose = require("mongoose");
const authenticateUser = require('./middleware/authentication');
// routers
const router = express.Router();
const authRouter = require('./routes/auth');
//const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// app.get('/', (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
// });
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
//app.use("/api/posts", postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB('mongodb+srv://ajwadmasood:Mongodb-1@cluster0.qvm7utq.mongodb.net/UniLink?retryWrites=true&w=majority');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
