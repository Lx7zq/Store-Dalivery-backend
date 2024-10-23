const express = require("express");
const Storecontroller = require("../controllers/store.controller")
const { authJwt, checkStoreAdmin } = require("../middlewares"); // นำเข้าฟังก์ชัน

const router = express.Router();

// Route to create a new store (requires admin privileges)
router.post("/", authJwt.verifyToken, authJwt.isAdmin, Storecontroller.createStore); // เปลี่ยนลำดับที่นี่

// Route to get all stores (supports pagination)
router.get("/", Storecontroller.getAllStores);

// Route to get a store by ID
router.get("/:id", Storecontroller.getStoreById);

// Route to update a store by ID (requires admin privileges)
router.put("/:id", authJwt.verifyToken, checkStoreAdmin, Storecontroller.updateStore); // เปลี่ยนลำดับที่นี่

// Route to delete a store by ID (requires admin privileges)
router.delete("/:id", authJwt.verifyToken, checkStoreAdmin, Storecontroller.deleteStore); // เปลี่ยนลำดับที่นี่

module.exports = router;
