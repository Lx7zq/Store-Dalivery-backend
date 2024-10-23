const Store = require("../models/store.model");

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const { name, address, adminId, direction, lat, lng, radius } = req.body;
    console.log(req.body);

    const userId = req.userId; // รับ userId จาก token ที่ถูก decode

    // สร้างร้านค้า พร้อมบันทึก adminId
    const store = await Store.create({
      name,
      address,
      adminId: userId, // ใช้ userId เป็น adminId ของร้านนี้
      direction,
      lat,
      lng,
      radius,
    });

    res.status(201).send({
      message: "Store created successfully!",
      store,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).send({ message: "Error occurred while creating store." });
  }
};


// Get all stores
exports.getAllStores = async (req, res) => {
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
exports.getStoreById = async (req, res) => {
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
exports.updateStore = async (req, res) => {
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
exports.deleteStore = async (req, res) => {
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
