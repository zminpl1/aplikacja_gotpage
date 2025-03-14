import express from "express"
import {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessListings,
  getBusinessReviews,
  verifyBusiness,
} from "../controllers/businesses.js"
import { protect, admin, checkOwnership } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getBusinesses)
router.get("/:id", getBusiness)
router.get("/:id/listings", getBusinessListings)
router.get("/:id/reviews", getBusinessReviews)

// Protected routes
router.post("/", protect, createBusiness)
router.put("/:id", protect, checkOwnership("business"), updateBusiness)
router.delete("/:id", protect, checkOwnership("business"), deleteBusiness)

// Admin routes
router.put("/:id/verify", protect, admin, verifyBusiness)

export default router

