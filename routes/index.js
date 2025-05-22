const routes = require("express").Router();
const cars = require('./cars');
const stores = require('./stores');

routes.use('/cars', cars);
routes.use('/stores', stores);

module.exports = routes;
