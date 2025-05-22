const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllCars = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('car').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleCar = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid car id to find a car.');
  }
  const carId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('car')
      .findOne({ _id: carId });
    if (!result) {
      return res.status(400).json({ message: 'Car not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createCar = async (req, res) => {
  const car = {
    name: req.body.name,
    color: req.body.color,
    brand: req.body.brand,
    production_year: req.body.production_year
  };

  try {
    const response = await mongodb.getDb().db().collection('car').insertOne(car);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the car.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the car.');
  }
};

const updateCar = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid car id to update a car.');
  }
  const carId = new ObjectId(req.params.id);
  const car = {
    name: req.body.name,
    color: req.body.color,
    brand: req.body.brand,
    production_year: req.body.production_year
  };

  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('car')
      .replaceOne({ _id: carId }, car);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the car.');
  }
};

const deleteCar = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid car id to delete a car.');
  }
  const carId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('car').deleteOne({ _id: carId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the car.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the car.');
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar
};
