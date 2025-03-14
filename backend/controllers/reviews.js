import { query } from "../config/db.js"

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { content, rating, business_id, listing_id } = req.body

    // Validate required fields
    if (!content || !rating || (!business_id && !listing_id)) {
      return res.status(400).json({
        success: false,
        message: "Please provide content, rating, and either business_id or listing_id",
      })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    // Check if business or listing exists
    if (business_id) {
      const business = await query("SELECT id FROM businesses WHERE id = ?", [business_id])
      if (business.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Business not found",
        })
      }
    }

    if (listing_id) {
      const listing = await query("SELECT id FROM listings WHERE id = ?", [listing_id])
      if (listing.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Listing not found",
        })
      }
    }

    // Check if user already reviewed this business or listing
    if (business_id) {
      const existingReview = await query("SELECT id FROM reviews WHERE user_id = ? AND business_id = ?", [
        req.user.id,
        business_id,
      ])

      if (existingReview.length > 0) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this business",
        })
      }
    }

    if (listing_id) {
      const existingReview = await query("SELECT id FROM reviews WHERE user_id = ? AND listing_id = ?", [
        req.user.id,
        listing_id,
      ])

      if (existingReview.length > 0) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this listing",
        })
      }
    }

    // Create review
    const result = await query(
      "INSERT INTO reviews (content, rating, user_id, business_id, listing_id) VALUES (?, ?, ?, ?, ?)",
      [content, rating, req.user.id, business_id || null, listing_id || null],
    )

    // Get created review
    const review = await query(
      `SELECT r.*, u.name as user_name, u.avatar as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [result.insertId],
    )

    res.status(201).json({
      success: true,
      data: review[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    const { content, rating } = req.body

    // Validate required fields
    if (!content && !rating) {
      return res.status(400).json({
        success: false,
        message: "Please provide content or rating to update",
      })
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    // Build update object
    const updateFields = []
    const values = []

    if (content) {
      updateFields.push("content = ?")
      values.push(content)
    }

    if (rating) {
      updateFields.push("rating = ?")
      values.push(rating)
    }

    // Add review ID to values array
    values.push(req.params.id)

    // Update review
    await query(`UPDATE reviews SET ${updateFields.join(", ")} WHERE id = ?`, values)

    // Get updated review
    const review = await query(
      `SELECT r.*, u.name as user_name, u.avatar as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [req.params.id],
    )

    if (review.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    res.status(200).json({
      success: true,
      data: review[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    // Check if review exists
    const review = await query("SELECT id FROM reviews WHERE id = ?", [req.params.id])

    if (review.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Delete review
    await query("DELETE FROM reviews WHERE id = ?", [req.params.id])

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

