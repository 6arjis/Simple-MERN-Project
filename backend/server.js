// backend/server.js   ← final working version

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// ──────────────────────────────
// PRODUCTION: Serve React/Vite build
// ──────────────────────────────
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // Serve static files (JS, CSS, images…)
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // THIS IS THE NEW CORRECT WAY (Express 5 compatible)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  // Helpful message in development
  app.get("/", (req, res) => {
    res.send("API is running. Go to http://localhost:5173 for the frontend");
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
