import jwt from "jsonwebtoken"
import { query } from "../config/db.js"

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token

  // Check for token in cookies or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if user exists
    const user = await query("SELECT id, name, email, role FROM users WHERE id = ?", [decoded.id])

    if (!user || user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    // Add user to request object
    req.user = user[0]
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }
}

// Admin only middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    return res.status(403).json({
      success: false,
      message: "Not authorized as an admin",
    })
  }
}

// Check if user owns the resource or is admin
export const checkOwnership = (resourceType) => async (req, res, next) => {
  try {
    const userId = req.user.id
    const resourceId = req.params.id
    let resource

    // Check ownership based on resource type
    switch (resourceType) {
      case "listing":
        resource = await query("SELECT user_id, business_id FROM listings WHERE id = ?", [resourceId])
        break
      case "business":
        resource = await query("SELECT user_id FROM businesses WHERE id = ?", [resourceId])
        break
      case "review":
        resource = await query("SELECT user_id FROM reviews WHERE id = ?", [resourceId])
        break
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid resource type",
        })
    }

    if (!resource || resource.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      })
    }

    // If user is admin or owner, allow access
    if (req.user.role === "admin" || resource[0].user_id === userId) {
      return next()
    }

    // For listings, also check if user owns the business that posted the listing
    if (resourceType === "listing" && resource[0].business_id) {
      const businessOwnership = await query("SELECT user_id FROM businesses WHERE id = ?", [resource[0].business_id])

      if (businessOwnership && businessOwnership.length > 0 && businessOwnership[0].user_id === userId) {
        return next()
      }
    }

    return res.status(403).json({
      success: false,
      message: "Not authorized to perform this action",
    })
  } catch (error) {
    console.error("Ownership check error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

