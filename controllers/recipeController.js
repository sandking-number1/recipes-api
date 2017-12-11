const recipeController = (Recipe) => {

  const post = function(req, res) {
    const recipe = new Recipe(req.body);

    recipe.save();
    res.status(201).send(recipe);

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
        res.json(recipes);
      }
    });
  };
  return {
    post: post,
    get: get
  };
};

export default recipeController;
