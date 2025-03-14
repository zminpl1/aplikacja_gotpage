import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import { fileURLToPath } from "url"
import path from "path"
import cookieParser from "cookie-parser"

// Import routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import businessRoutes from "./routes/businesses.js"
import listingRoutes from "./routes/listings.js"
import reviewRoutes from "./routes/reviews.js"
import categoryRoutes from "./routes/categories.js"

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js"
import { notFound } from "./middleware/notFound.js"

// Configuration
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(morgan("dev"))
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Static files (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))
}

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/businesses", businessRoutes)
app.use("/api/listings", listingRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/categories", categoryRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  })
}

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app

