const userController = (User) => {

    const post = function(req, res) {
      const user = new User(req.body);
      if(!req.body.googleId) {
        res.status(400);
        res.send('Google Id is required');
      } else {
        user.save();
        res.status(201);
        res.send(user);
      }
    };
  
    const get = function(req, res) {
  
      const query = {};
      User.find(query, function(err, users) {
        if(err) {
          res.status(500).send(err);
        } else {
          let returnUsers = [];
          users.forEach(function(element) {
            const newUser = element.toJSON();
            returnUsers.push(newUser);
          });
          res.json(returnUsers);
        }
      });
    };
    return {
      post: post,
      get: get
    };
  };
  
  export default userController;
  