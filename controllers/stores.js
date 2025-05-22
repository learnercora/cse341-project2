const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllStores = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('stores').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleStore = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid store id to find a store.');
  }
  const storeId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('stores')
      .findOne({ _id: storeId });
    if (!result) {
      return res.status(400).json({ message: 'Store not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createStore = async (req, res) => {
  const store = {
    name: req.body.name,
    employee_num: req.body.employee_num,
    address: req.body.address
  };

  try {
    const response = await mongodb.getDb().db().collection('stores').insertOne(store);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the store.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the store.');
  }
};

const updateStore = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid store id to update a store.');
  }
  const storeId = new ObjectId(req.params.id);
  const store = {
    name: req.body.name,
    employee_num: req.body.employee_num,
    address: req.body.address
  };

  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('stores')
      .replaceOne({ _id: storeId }, store);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the store.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the store.');
  }
};

const deleteStore = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid store id to delete a store.');
  }
  const storeId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('stores').deleteOne({ _id: storeId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the store.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the store.');
  }
};

module.exports = {
  getAllStores,
  getSingleStore,
  createStore,
  updateStore,
  deleteStore
};
