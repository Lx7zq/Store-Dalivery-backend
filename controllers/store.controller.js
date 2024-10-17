const Store = require("../models/store.model"); 

// Create a new store
const createStore = async (req, res) => {
  try {
    const { name, adminId, address, direction, lat, lng, radius } = req.body;
    const newStore = await Store.create({
      name,
      adminId,
      address,
      direction,
      lat,
      lng,
      radius,
    });
    res.status(201).json({
      message: "Store created successfully",
      store: newStore,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating store",
      error: error.message,
    });
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching stores",
      error: error.message,
    });
  }
};

// Get a single store by ID
const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching store",
      error: error.message,
    });
  }
};

// Update a store
const updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { name, adminId, address, direction, lat, lng, radius } = req.body;

    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.update({
      name,
      adminId,
      address,
      direction,
      lat,
      lng,
      radius,
    });

    res.status(200).json({
      message: "Store updated successfully",
      store,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating store",
      error: error.message,
    });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.destroy();

    res.status(200).json({
      message: "Store deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting store",
      error: error.message,
    });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};
