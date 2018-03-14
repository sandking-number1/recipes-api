import passport from 'passport';

const authRoutes = (app) => {
    app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      return res.status(200).send(JSON.stringify(req.user));
      // res.redirect('https://arcane-castle-79035.herokuapp.com/recipes');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('https://arcane-castle-79035.herokuapp.com');
  });

  app.get('/api/current_user', (req, res) => {
    // res.setHeader('x-auth-token');
    return res.status(200).send(JSON.stringify(req.user));
  });
};

export default authRoutes;
