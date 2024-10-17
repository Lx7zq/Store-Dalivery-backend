const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const PORT = process.env.PORT || 5000;
const frontend_url = process.env.FRONTEND_URL;
const role = db.Role;
const Store = db.Store;
const User = db.User; // นำเข้ารุ่น User

const app = express();

const corsOption = {
  origin: frontend_url,
};

// เชื่อมต่อฐานข้อมูลและซิงค์โมเดล
// db.sequelize
//   .sync({ alter: false }) // ใช้ alter: true เพื่อให้ฐานข้อมูลอัพเดตตามโมเดล
//   .then(() => {
//     console.log("Database synchronized");
//     initRole(); // เรียกใช้ฟังก์ชันเพื่อสร้างบทบาท
//     User.sync(); // ซิงค์โมเดล User
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });

// ฟังก์ชันเพื่อสร้าง Role (ในกรณีที่ยังไม่มี)
const initRole = async () => {
  try {
    await role.findOrCreate({ where: { id: 1, name: "user" } });
    await role.findOrCreate({ where: { id: 2, name: "moderator" } });
    await role.findOrCreate({ where: { id: 3, name: "admin" } });
    console.log("Roles initialized");
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};

// Middleware
app.use(cors(corsOption));

// Route ดึงข้อมูลร้านค้าจากฐานข้อมูล
app.get("/api/stores", async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching stores", error: error.message });
  }
});

// หน้าเริ่มต้น
app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for Store Delivery Zone Checker</h1>");
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
