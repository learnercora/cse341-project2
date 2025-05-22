const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');

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
  validation.saveCar,
  carsController.createCar
);

router.put('/:id',
  // #swagger.tags = ['Cars']
  validation.saveCar,
  carsController.updateCar
);

router.delete('/:id',
  // #swagger.tags = ['Cars']
  carsController.deleteCar
);

module.exports = router;
