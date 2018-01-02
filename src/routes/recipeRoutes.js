import express from 'express';
import recipeController from '../controllers/recipeController';

const routes = (Recipe) => {
  const recipeRouter = express.Router();
  const recipeControllerCall = recipeController(Recipe);

  recipeRouter.route('/')
  .post(recipeControllerCall.post)
  .get(recipeControllerCall.get);

  recipeRouter.use('/_id', function(req, res, next){
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

recipeRouter.route('/:_id')
.get(function(req, res) {
  console.log(recipeControllerCall);
  console.log(req.recipe);
    const returnRecipe = req.recipe.toJSON();

    returnRecipe.links = {};
    let tagsList = returnRecipe.tags.map(key => {
      return encodeURIComponent(key);
    }).join(',');
    const newLink = `http://${req.headers.host}/api/recipes/?tags=${tagsList}`;
    console.log(newLink);
    returnRecipe.links.FilterByTags = newLink.replace(' ', '%20');
    res.json(returnRecipe);
  })
  .put(function(req, res) {
    req.recipe.name = req.body.name;
    req.recipe.ingredients = req.body.ingredients;
    req.recipe.instructions = req.body.instructions;
    req.recipe.tags = req.body.tags;
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
