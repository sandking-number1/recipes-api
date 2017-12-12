const recipeController = (Recipe) => {

  const post = function(req, res) {
    const recipe = new Recipe(req.body);

    if(!req.body.name) {
      res.status(400);
      res.send('Name is required');
    } else {
      recipe.save();
      res.status(201);
      res.send(recipe);
    }
  };

  const get = function(req, res) {

    const query = {};

    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Recipe.find(query, function(err, recipes) {
      if(err) {
        res.status(500).send(err);
      } else {
        let returnRecipes = [];
        recipes.forEach(function(element, index, array) {
          const newRecipe = element.toJSON();
          newRecipe.links = {};
          newRecipe.links.self = `http://${req.headers.host}/api/books/${newRecipe._id}`;
          returnRecipes.push(newRecipe);
        });
        res.json(returnRecipes);
      }
    });
  };
  return {
    post: post,
    get: get
  };
};

export default recipeController;
