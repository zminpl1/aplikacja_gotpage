import express from "express"
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserListings,
  getSavedListings,
  saveUnsaveListing,
  getUserReviews,
} from "../controllers/users.js"
import { protect, admin, checkOwnership } from "../middleware/auth.js"

const router = express.Router()

// Admin routes
router.get("/", protect, admin, getUsers)

// Public routes
router.get("/:id", getUser)
router.get("/:id/listings", getUserListings)
router.get("/:id/reviews", getUserReviews)

// Protected routes
router.put("/:id", protect, checkOwnership("user"), updateUser)
router.delete("/:id", protect, checkOwnership("user"), deleteUser)
router.get("/:id/saved-listings", protect, checkOwnership("user"), getSavedListings)
router.post("/:id/save-listing/:listingId", protect, checkOwnership("user"), saveUnsaveListing)

export default router

