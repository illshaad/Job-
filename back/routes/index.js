const express = require('express');
const passport = require('passport')
const app = express();


app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
app.get('google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:3001')
})

module.exports = app;
