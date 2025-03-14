import express from "express"
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingReviews,
  incrementListingViews,
  getFeaturedListings,
  getRecentListings,
  searchListings,
} from "../controllers/listings.js"
import { protect, checkOwnership } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getListings)
router.get("/featured", getFeaturedListings)
router.get("/recent", getRecentListings)
router.get("/search", searchListings)
router.get("/:id", getListing)
router.get("/:id/reviews", getListingReviews)
router.post("/:id/view", incrementListingViews)

// Protected routes
router.post("/", protect, createListing)
router.put("/:id", protect, checkOwnership("listing"), updateListing)
router.delete("/:id", protect, checkOwnership("listing"), deleteListing)

export default router

