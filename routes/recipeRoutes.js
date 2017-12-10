import express from 'express';

const routes = (Recipe) => {
  const recipeRouter = express.Router();

  recipeRouter.route('/')
  .post(function(req, res) {
    const recipe = new Recipe(req.body);

    recipe.save();
    res.status(201).send(recipe);

  })
  .get(function(req, res) {

    const query = {};

    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Recipe.find(query, function(err, recipes) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(recipes);
      }
    });
  });

recipeRouter.route('/:recipeId')
.get(function(req, res) {
    Recipe.findById(req.params.recipeId, function(err, recipe) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(recipe);
      }
    });
  })
  .put(function(req, res) {
    Recipe.findById(req.params.recipeId, function(err, recipe) {
      if(err) {
        res.status(500).send(err);
      } else {
        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.instructions = req.body.instructions;
        recipe.category = req.body.category;
        recipe.save();
        res.json(recipe);
      }
    });
  });
  return recipeRouter;
};

export default routes;
