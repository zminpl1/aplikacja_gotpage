import express from "express"
import { register, login, logout, getMe, updatePassword, forgotPassword, resetPassword } from "../controllers/auth.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password/:resetToken", resetPassword)

// Protected routes
router.get("/me", protect, getMe)
router.put("/update-password", protect, updatePassword)
router.get("/logout", protect, logout)

export default router

