import express from 'express';
import userController from '../controllers/userController';

const userRoutes = (User) => {
    const userRouter = express.Router();
    const userControllerCall = userController(User);
  
    userRouter.route('/auth/google')
    .post(userControllerCall.post)
    .get(userControllerCall.get);
  
    userRouter.use('/:_id', function(req, res, next){
      User.findById(req.params.googleId, function(err, user) {
        if(err) {
          res.status(500).send(err);
        } else if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).send('No user found');
        }
      });
    });
  
  userRouter.route('/:_id')
  .get(function(req, res) {
    const returnUser = req.user.toJSON();
      res.json(returnUser);
    });
    return userRouter;
  };
  
  export default userRoutes;