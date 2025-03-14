import express from "express"
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryListings,
} from "../controllers/categories.js"
import { protect, admin } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getCategories)
router.get("/:id", getCategory)
router.get("/:id/listings", getCategoryListings)

// Admin routes
router.post("/", protect, admin, createCategory)
router.put("/:id", protect, admin, updateCategory)
router.delete("/:id", protect, admin, deleteCategory)

export default router

