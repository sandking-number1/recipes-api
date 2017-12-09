import express from'express';
// import path from'path';
import open from'open';
import webpack from 'webpack';
import config from '../webpack.config.babel';

/* eslint-disable no-console */

const port = process.env.PORT || 3002;
const app = express();
const compiler = webpack(config);

const recipeRouter = express.Router();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

recipeRouter.route('/recipes')
  .get(function(req, res) {
    res.json([
      {'id': 1, 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@gmail.com'},
      {'id': 2, 'firstName': 'Tammy', 'lastName': 'Norton', 'email': 'tnorton@yahoo.com'},
      {'id': 3, 'firstName': 'Tina', 'lastName': 'Lee', 'email': 'tina@hotmail.com'}
    ]);
  });

app.use('/api', recipeRouter);

app.get('/', function (req, res) {
  res.send('This API Template');
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
