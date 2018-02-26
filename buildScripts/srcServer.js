import express from 'express';
// import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.babel';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipeRouter from '../src/routes/recipeRoutes';
import userRouter from '../src/routes/userRoutes';
import recipe from '../src/models/recipeModel';
import userModel from '../src/models/userModel';
require('../src/services/passport.js');
import authRoutes from '../src/routes/authRoutes';
import keys from '../config/keys';

const recipeRouteCall = recipeRouter(recipe);
const userRouteCall = userRouter(userModel);
/* eslint-disable no-console */
const port = process.env.PORT || 3030;
const app = express();
const compiler = webpack(config);
let mongooseUri = '';

authRoutes(app);

// console.log(process.env.ENV);

if(process.env.ENV === undefined) {
  mongooseUri = keys.mongoURI;
} else {
  mongooseUri = keys.mongoURI;
}

mongoose.connect(mongooseUri, {
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDb Connected');
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/recipes', recipeRouteCall);
app.use('/api/users', userRouteCall);

// app.get('/', function (req, res) {
//   res.send('Welcome to the Recipes API!');
// });

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

export default app;
