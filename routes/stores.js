const express = require('express');
const router = express.Router();

const storesController = require('../controllers/stores');
const validation = require('../middleware/validate');

router.get('/',
  // #swagger.tags = ['Stores']
  storesController.getAllStores
);

router.get('/:id',
  // #swagger.tags = ['Stores']
  storesController.getSingleStore
);

router.post('/',
  // #swagger.tags = ['Stores']
  validation.saveStore,
  storesController.createStore
);

router.put('/:id',
  // #swagger.tags = ['Stores']
  validation.saveStore,
  storesController.updateStore
);

router.delete('/:id',
  // #swagger.tags = ['Stores']
  storesController.deleteStore
);

module.exports = router;
