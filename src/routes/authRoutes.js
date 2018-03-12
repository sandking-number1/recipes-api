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
      res.redirect('https://arcane-castle-79035.herokuapp.com/recipes');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('https://arcane-castle-79035.herokuapp.com');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

export default authRoutes;
