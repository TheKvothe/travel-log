const express = require ('express');
const morgan = require('morgan');
const helmet = require ('helmet');
const cors = require ('cors');

const middlewares = require('./middlewares');

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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening https://localhost:${port}`);
});
