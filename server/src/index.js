const express = require ('express');
const morgan = require('morgan');
const helmet = require ('helmet');
const cors = require ('cors');

const app = express();
app.use(morgan('common'));
// helmet adds headers to the response from server
// helmet eliminates the x-powered-by header (safer)
app.use(helmet());
app.use(cors({
  origin: 'https://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

app.use((req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🐸' : error.stack,
  });
});
const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening https://localhost:${port}`);
});
