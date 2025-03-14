import express from "express"
import { createReview, updateReview, deleteReview } from "../controllers/reviews.js"
import { protect, checkOwnership } from "../middleware/auth.js"

const router = express.Router()

// Protected routes
router.post("/", protect, createReview)
router.put("/:id", protect, checkOwnership("review"), updateReview)
router.delete("/:id", protect, checkOwnership("review"), deleteReview)

export default router

