import express from 'express';
import Path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.babel';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipeRouter from '../src/routes/recipeRoutes';
import recipe from '../src/models/recipeModel';
import passport from 'passport';
import authRoutes from '../src/routes/authRoutes';
require('../src/models/userModel');
require('../src/services/passport.js');
import keys from '../config/keys';
import cookieSession from 'cookie-session';

const recipeRouteCall = recipeRouter(recipe);
/* eslint-disable no-console */
const port = process.env.PORT || 3030;
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/src/index.html'));
  });
}

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

export default app;
