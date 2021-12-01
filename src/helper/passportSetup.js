import dotenv from 'dotenv';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();


export default (passport) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/redirect',
        profileFields: ['id', 'name', 'email']
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );
};
