import { query } from "../config/db.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await query("SELECT id, name, email, avatar, location, member_since, role FROM users")

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
export const getUser = async (req, res, next) => {
  try {
    const user = await query(
      "SELECT id, name, email, avatar, cover_image, location, bio, member_since FROM users WHERE id = ?",
      [req.params.id],
    )

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, avatar, cover_image, location, bio, phone } = req.body

    // Build update object
    const updateFields = []
    const values = []

    if (name) {
      updateFields.push("name = ?")
      values.push(name)
    }

    if (email) {
      updateFields.push("email = ?")
      values.push(email)
    }

    if (avatar) {
      updateFields.push("avatar = ?")
      values.push(avatar)
    }

    if (cover_image) {
      updateFields.push("cover_image = ?")
      values.push(cover_image)
    }

    if (location) {
      updateFields.push("location = ?")
      values.push(location)
    }

    if (bio) {
      updateFields.push("bio = ?")
      values.push(bio)
    }

    if (phone) {
      updateFields.push("phone = ?")
      values.push(phone)
    }

    // Add user ID to values array
    values.push(req.params.id)

    // Update user
    if (updateFields.length > 0) {
      await query(`UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`, values)
    }

    // Get updated user
    const updatedUser = await query(
      "SELECT id, name, email, avatar, cover_image, location, bio, phone, member_since FROM users WHERE id = ?",
      [req.params.id],
    )

    res.status(200).json({
      success: true,
      data: updatedUser[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await query("SELECT id FROM users WHERE id = ?", [req.params.id])

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete user
    await query("DELETE FROM users WHERE id = ?", [req.params.id])

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user listings
// @route   GET /api/users/:id/listings
// @access  Public
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await query(
      `SELECT l.*, c.name as category_name 
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       WHERE l.user_id = ?
       ORDER BY l.created_at DESC`,
      [req.params.id],
    )

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user saved listings
// @route   GET /api/users/:id/saved-listings
// @access  Private
export const getSavedListings = async (req, res, next) => {
  try {
    const savedListings = await query(
      `SELECT l.*, c.name as category_name, sl.created_at as saved_at
       FROM saved_listings sl
       JOIN listings l ON sl.listing_id = l.id
       LEFT JOIN categories c ON l.category_id = c.id
       WHERE sl.user_id = ?
       ORDER BY sl.created_at DESC`,
      [req.params.id],
    )

    res.status(200).json({
      success: true,
      count: savedListings.length,
      data: savedListings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Save or unsave a listing
// @route   POST /api/users/:id/save-listing/:listingId
// @access  Private
export const saveUnsaveListing = async (req, res, next) => {
  try {
    const { id: userId } = req.params
    const { listingId } = req.params

    // Check if listing exists
    const listing = await query("SELECT id FROM listings WHERE id = ?", [listingId])
    if (listing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      })
    }

    // Check if already saved
    const saved = await query("SELECT id FROM saved_listings WHERE user_id = ? AND listing_id = ?", [userId, listingId])

    if (saved.length > 0) {
      // Unsave
      await query("DELETE FROM saved_listings WHERE user_id = ? AND listing_id = ?", [userId, listingId])

      return res.status(200).json({
        success: true,
        message: "Listing unsaved successfully",
        saved: false,
      })
    } else {
      // Save
      await query("INSERT INTO saved_listings (user_id, listing_id) VALUES (?, ?)", [userId, listingId])

      return res.status(200).json({
        success: true,
        message: "Listing saved successfully",
        saved: true,
      })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Get user reviews
// @route   GET /api/users/:id/reviews
// @access  Public
export const getUserReviews = async (req, res, next) => {
  try {
    const reviews = await query(
      `SELECT r.*, 
        CASE 
          WHEN r.business_id IS NOT NULL THEN 'business'
          WHEN r.listing_id IS NOT NULL THEN 'listing'
        END as review_type,
        COALESCE(b.name, l.title) as reviewed_name
       FROM reviews r
       LEFT JOIN businesses b ON r.business_id = b.id
       LEFT JOIN listings l ON r.listing_id = l.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [req.params.id],
    )

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    })
  } catch (error) {
    next(error)
  }
}

