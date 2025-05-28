const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',
  // #swagger.tags = ['Cars']
  carsController.getAllCars
);

router.get('/:id',
  // #swagger.tags = ['Cars']
  carsController.getSingleCar
);

router.post('/',
  // #swagger.tags = ['Cars']
  isAuthenticated,
  validation.saveCar,
  carsController.createCar
);

router.put('/:id',
  // #swagger.tags = ['Cars']
  isAuthenticated,
  validation.saveCar,
  carsController.updateCar
);

router.delete('/:id',
  // #swagger.tags = ['Cars']
  isAuthenticated,
  carsController.deleteCar
);

module.exports = router;
