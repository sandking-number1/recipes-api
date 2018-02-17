import express from 'express';
// import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.babel';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipeRouter from '../src/routes/recipeRoutes';
import Recipe from '../src/models/recipeModel';

const recipeRouteCall = recipeRouter(Recipe);
/* eslint-disable no-console */
const port = process.env.PORT || 3030;
const app = express();
const compiler = webpack(config);
let mongooseUri = '';

// console.log(process.env.ENV);

if(process.env.ENV === undefined) {
  mongooseUri = `mongodb://ethriel3695:KnNB7iuQKmzZWtcw@cluster0-shard-00-00-h9eli.mongodb.net:27017,cluster0-shard-00-01-h9eli.mongodb.net:27017,cluster0-shard-00-02-h9eli.mongodb.net:27017/Recipes?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
} else {
  mongooseUri = `mongodb://ethriel3695:KnNB7iuQKmzZWtcw@cluster0-shard-00-00-h9eli.mongodb.net:27017,cluster0-shard-00-01-h9eli.mongodb.net:27017,cluster0-shard-00-02-h9eli.mongodb.net:27017/Recipes?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
}

mongoose.connect(mongooseUri, {
  useMongoClient: true
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

app.get('/', function (req, res) {
  res.send('Welcome to the Recipes API!');
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

export default app;
