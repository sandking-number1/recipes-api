import express from 'express';
import recipeController from '../controllers/recipeController';

const routes = (Recipe) => {
  const recipeRouter = express.Router();
  const recipeControllerCall = recipeController(Recipe);

  recipeRouter.route('/')
  .post(recipeControllerCall.post)
  .get(recipeControllerCall.get);

  recipeRouter.use('/recipeId', function(req, res, next){
    Recipe.findById(req.params.recipeId, function(err, recipe) {
      if(err) {
        res.status(500).send(err);
      } else if (recipe) {
        req.recipe = recipe;
        next();
      } else {
        res.status(404).send('No recipe found');
      }
    });
  });

recipeRouter.route('/:recipeId')
.get(function(req, res) {

    const returnRecipe = req.recipe.toJSON();

    returnRecipe.links = {};
    const newLink = `http://${req.headers.host}/api/books/?genre=${returnRecipe.genre}`
    returnRecipe.links.FilterByThisGenre = newLink.replace(' ', '%20');
    res.json(returnRecipe);
  })
  .put(function(req, res) {
    req.recipe.name = req.body.name;
    req.recipe.ingredients = req.body.ingredients;
    req.recipe.instructions = req.body.instructions;
    req.recipe.category = req.body.category;
    req.recipe.save(function(err) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(req.recipe);
      }
    });
  })
  .patch(function(req, res) {
    if (req.body._id) {
      delete req.body_id;
    }
    for (let parameter in req.body) {
      req.recipe[parameter] = req.body[parameter];
    }
    req.recipe.save(function(err) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(req.recipe);
      }
    });
  })
  .delete(function(req, res) {
    req.recipe.remove(function(err){
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Recipe Removed');
      }
    });
  });
  return recipeRouter;
};

export default routes;
