import mongoose from 'mongoose';

const recipeModel = new mongoose.Schema({
  name: {
    type: String
  },
  ingredients: [{
    type: String
  }],
  instructions: [{
    type: String
  }],
  tags: [{
    type: String
  }]
});

const recipe = mongoose.model('Recipe', recipeModel);

export default recipe;
