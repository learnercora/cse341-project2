const routes = require("express").Router();
const cars = require('./cars');

routes.use('/cars', cars);

module.exports = routes;
