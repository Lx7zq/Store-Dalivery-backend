const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const storeRoutes = require("./routes/store.router"); // Import store routes
const authRouter = require("./routes/auth.router");

const PORT = process.env.PORT || 5000;
const frontend_url = process.env.FRONTEND_URL;
const { Role, User, Store } = db; // Destructure models

const app = express();

// CORS configuration
const corsOptions = {
  origin: frontend_url,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON requests

// Validate environment variables
if (!frontend_url) {
  console.error("FRONTEND_URL is not defined in environment variables.");
  process.exit(1);
}

// Database connection and model synchronization
// db.sequelize
//   .sync({ alter: false }) // Set `alter: true` to auto-update tables based on models
//   .then(() => {
//     console.log("Database synchronized");
//     initRoles(); // Initialize roles
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//     process.exit(1); // Exit process if DB sync fails
//   });

// Initialize roles if they don't exist
const initRoles = async () => {
  try {
    await Role.findOrCreate({ where: { id: 1, name: "user" } });
    await Role.findOrCreate({ where: { id: 2, name: "moderator" } });
    await Role.findOrCreate({ where: { id: 3, name: "admin" } });
    console.log("Roles initialized");
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};

// Routes
app.use("/api/stores", storeRoutes); // Use store routes
app.use('/api/auth', authRouter); // เพิ่ม auth router สำหรับการจัดการการล็อกอิน

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API for Store Delivery Zone Checker</h1>");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
