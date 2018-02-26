import passport from 'passport';
import Google from 'passport-google-oauth20';
import keys from '../../config/keys';
import mongoose from 'mongoose';
const GoogleStrategy = Google.Strategy;

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne( { googleId: profile.Id })
            .then((existingUser) => {
                if (existingUser) {
                    // We already have a record with the given profile Id
                    console.log('User already exists');
                } else {
                    new User({ 
                        googleId: profile.id 
                    }).save();
                }
            });
    }
    )
);