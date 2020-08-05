const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/Users');
const collaborateur = require('../models/collaborteurs')


const GOOGLE_CLIENT_ID = '939765445894-gkfl9fd7gpd2vehkhdp1ju8g7760p2ca.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'eX5TmBQDbBibI_s2rI71tIIz'

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);

        }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
} 
