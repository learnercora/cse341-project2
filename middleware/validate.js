const validator = require('../helpers/validate');

const saveCar = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    color: 'required|string',
    brand: 'required|string',
    production_year: 'required|integer|min:1900|max:2025'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveStore = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    employee_num: 'required|integer',
    address: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCar,
  saveStore
};