const routes = require("express").Router();
const passport = require("passport");
const cars = require('./cars');
const stores = require('./stores');

routes.use('/', require('./swagger'));
routes.use('/cars', cars);
routes.use('/stores', stores);

routes.get('/login', passport.authenticate('github'), (req, res)=>{})

routes.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    })
})
module.exports = routes;
