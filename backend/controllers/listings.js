import { query } from "../config/db.js"

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res, next) => {
  try {
    // Initialize query parts
    let sql = `
      SELECT l.*, c.name as category_name, 
      COALESCE(b.name, u.name) as owner_name,
      COALESCE(b.verified, 0) as owner_verified,
      (SELECT AVG(rating) FROM reviews WHERE listing_id = l.id) as rating,
      (SELECT COUNT(*) FROM reviews WHERE listing_id = l.id) as reviews_count
      FROM listings l
      LEFT JOIN categories c ON l.category_id = c.id
      LEFT JOIN businesses b ON l.business_id = b.id
      LEFT JOIN users u ON l.user_id = u.id
    `

    const queryParams = []
    const conditions = []

    // Filter by category
    if (req.query.category) {
      conditions.push("l.category_id = ?")
      queryParams.push(req.query.category)
    }

    // Filter by location
    if (req.query.location) {
      conditions.push("l.location LIKE ?")
      queryParams.push(`%${req.query.location}%`)
    }

    // Filter by price range
    if (req.query.minPrice) {
      conditions.push("l.price >= ?")
      queryParams.push(req.query.minPrice)
    }

    if (req.query.maxPrice) {
      conditions.push("l.price <= ?")
      queryParams.push(req.query.maxPrice)
    }

    // Filter by search term
    if (req.query.search) {
      conditions.push("(l.title LIKE ? OR l.description LIKE ?)")
      queryParams.push(`%${req.query.search}%`)
      queryParams.push(`%${req.query.search}%`)
    }

    // Filter by featured
    if (req.query.featured) {
      conditions.push("l.featured = ?")
      queryParams.push(req.query.featured === "true" ? 1 : 0)
    }

    // Filter by business
    if (req.query.business) {
      conditions.push("l.business_id = ?")
      queryParams.push(req.query.business)
    }

    // Filter by user
    if (req.query.user) {
      conditions.push("l.user_id = ?")
      queryParams.push(req.query.user)
    }

    // Add WHERE clause if conditions exist
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`
    }

    // Add sorting
    const validSortFields = ["created_at", "price", "views", "rating"]
    const sortField = validSortFields.includes(req.query.sort) ? req.query.sort : "created_at"
    const sortOrder = req.query.order === "asc" ? "ASC" : "DESC"

    sql += ` ORDER BY l.featured DESC, ${sortField} ${sortOrder}`

    // Add pagination
    const page = Number.parseInt(req.query.page, 10) || 1
    const limit = Number.parseInt(req.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    sql += " LIMIT ? OFFSET ?"
    queryParams.push(limit, startIndex)

    // Execute query
    const listings = await query(sql, queryParams)

    // Get total count for pagination
    let countSql = "SELECT COUNT(*) as total FROM listings l"
    if (conditions.length > 0) {
      countSql += ` WHERE ${conditions.join(" AND ")}`
    }

    const totalResults = await query(countSql, queryParams.slice(0, -2))
    const total = totalResults[0].total

    // Pagination result
    const pagination = {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }

    res.status(200).json({
      success: true,
      pagination,
      count: listings.length,
      data: listings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get featured listings
// @route   GET /api/listings/featured
// @access  Public
export const getFeaturedListings = async (req, res, next) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10) || 6

    const listings = await query(
      `SELECT l.*, c.name as category_name, 
       COALESCE(b.name, u.name) as owner_name,
       COALESCE(b.verified, 0) as owner_verified
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       LEFT JOIN businesses b ON l.business_id = b.id
       LEFT JOIN users u ON l.user_id = u.id
       WHERE l.featured = 1
       ORDER BY l.created_at DESC
       LIMIT ?`,
      [limit],
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

// @desc    Get recent listings
// @route   GET /api/listings/recent
// @access  Public
export const getRecentListings = async (req, res, next) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10) || 6

    const listings = await query(
      `SELECT l.*, c.name as category_name, 
       COALESCE(b.name, u.name) as owner_name,
       COALESCE(b.verified, 0) as owner_verified
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       LEFT JOIN businesses b ON l.business_id = b.id
       LEFT JOIN users u ON l.user_id = u.id
       ORDER BY l.created_at DESC
       LIMIT ?`,
      [limit],
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

// @desc    Search listings
// @route   GET /api/listings/search
// @access  Public
export const searchListings = async (req, res, next) => {
  try {
    const { q, category, location } = req.query
    const limit = Number.parseInt(req.query.limit, 10) || 10

    // Build query conditions
    const conditions = []
    const queryParams = []

    if (q) {
      conditions.push("(l.title LIKE ? OR l.description LIKE ?)")
      queryParams.push(`%${q}%`)
      queryParams.push(`%${q}%`)
    }

    if (category) {
      conditions.push("l.category_id = ?")
      queryParams.push(category)
    }

    if (location) {
      conditions.push("l.location LIKE ?")
      queryParams.push(`%${location}%`)
    }

    // If no search parameters, return empty result
    if (conditions.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      })
    }

    // Add limit parameter
    queryParams.push(limit)

    // Execute query
    const listings = await query(
      `SELECT l.*, c.name as category_name, 
       COALESCE(b.name, u.name) as owner_name,
       COALESCE(b.verified, 0) as owner_verified
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       LEFT JOIN businesses b ON l.business_id = b.id
       LEFT JOIN users u ON l.user_id = u.id
       WHERE ${conditions.join(" AND ")}
       ORDER BY l.featured DESC, l.created_at DESC
       LIMIT ?`,
      queryParams,
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

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req, res, next) => {
  try {
    const listing = await query(
      `SELECT l.*, c.name as category_name, 
       COALESCE(b.name, u.name) as owner_name,
       COALESCE(b.verified, 0) as owner_verified,
       (SELECT AVG(rating) FROM reviews WHERE listing_id = l.id) as rating,
       (SELECT COUNT(*) FROM reviews WHERE listing_id = l.id) as reviews_count
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       LEFT JOIN businesses b ON l.business_id = b.id
       LEFT JOIN users u ON l.user_id = u.id
       WHERE l.id = ?`,
      [req.params.id],
    )

    if (listing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      })
    }

    // Parse JSON fields
    if (listing[0].images) {
      try {
        listing[0].images = JSON.parse(listing[0].images)
      } catch (e) {
        listing[0].images = []
      }
    }

    res.status(200).json({
      success: true,
      data: listing[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
export const createListing = async (req, res, next) => {
  try {
    const { title, description, images, price, location, category_id, featured, business_id } = req.body

    // Validate required fields
    if (!title || !description || !price || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, price and location",
      })
    }

    // Determine if listing is from user or business
    const userId = req.user.id
    let businessId = null

    if (business_id) {
      // Check if user owns the business
      const business = await query("SELECT id FROM businesses WHERE id = ? AND user_id = ?", [business_id, userId])

      if (business.length === 0) {
        return res.status(403).json({
          success: false,
          message: "You do not own this business",
        })
      }

      businessId = business_id
    }

    // Create listing
    const result = await query(
      `INSERT INTO listings (
        title, description, images, price, location, category_id,
        featured, user_id, business_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        images ? JSON.stringify(images) : null,
        price,
        location,
        category_id || null,
        featured ? 1 : 0,
        userId,
        businessId,
      ],
    )

    // Get created listing
    const listing = await query("SELECT * FROM listings WHERE id = ?", [result.insertId])

    res.status(201).json({
      success: true,
      data: listing[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res, next) => {
  try {
    const { title, description, images, price, location, category_id, featured } = req.body

    // Build update object
    const updateFields = []
    const values = []

    if (title) {
      updateFields.push("title = ?")
      values.push(title)
    }

    if (description !== undefined) {
      updateFields.push("description = ?")
      values.push(description)
    }

    if (images !== undefined) {
      updateFields.push("images = ?")
      values.push(images ? JSON.stringify(images) : null)
    }

    if (price) {
      updateFields.push("price = ?")
      values.push(price)
    }

    if (location) {
      updateFields.push("location = ?")
      values.push(location)
    }

    if (category_id !== undefined) {
      updateFields.push("category_id = ?")
      values.push(category_id)
    }

    if (featured !== undefined) {
      updateFields.push("featured = ?")
      values.push(featured ? 1 : 0)
    }

    // Add listing ID to values array
    values.push(req.params.id)

    // Update listing
    if (updateFields.length > 0) {
      await query(`UPDATE listings SET ${updateFields.join(", ")} WHERE id = ?`, values)
    }

    // Get updated listing
    const listing = await query("SELECT * FROM listings WHERE id = ?", [req.params.id])

    if (listing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      })
    }

    res.status(200).json({
      success: true,
      data: listing[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res, next) => {
  try {
    // Check if listing exists
    const listing = await query("SELECT id FROM listings WHERE id = ?", [req.params.id])

    if (listing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      })
    }

    // Delete listing
    await query("DELETE FROM listings WHERE id = ?", [req.params.id])

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get listing reviews
// @route   GET /api/listings/:id/reviews
// @access  Public
export const getListingReviews = async (req, res, next) => {
  try {
    const reviews = await query(
      `SELECT r.*, u.name as user_name, u.avatar as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.listing_id = ?
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

// @desc    Increment listing views
// @route   POST /api/listings/:id/view
// @access  Public
export const incrementListingViews = async (req, res, next) => {
  try {
    // Check if listing exists
    const listing = await query("SELECT id, views FROM listings WHERE id = ?", [req.params.id])

    if (listing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      })
    }

    // Increment views
    const newViews = (listing[0].views || 0) + 1
    await query("UPDATE listings SET views = ? WHERE id = ?", [newViews, req.params.id])

    res.status(200).json({
      success: true,
      data: {
        views: newViews,
      },
    })
  } catch (error) {
    next(error)
  }
}
;```tsx file="backend/controllers/reviews.js"
import { query } from '../config/db.js';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { content, rating, business_id, listing_id } = req.body;

    // Validate required fields
    if (!content || !rating || (!business_id && !listing_id)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide content, rating, and either business_id or listing_id'
      });
    }

    // Validate rating
    if (rating &lt; 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if business or listing exists
    if (business_id) {
      const business = await query('SELECT id FROM businesses WHERE id = ?', [business_id]);
      if (business.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Business not found'
        });
      }
    }

    if (listing_id) {
      const listing = await query('SELECT id FROM listings WHERE id = ?', [listing_id]);
      if (listing.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Listing not found'
        });
      }
    }

    // Check if user already reviewed this business or listing
    if (business_id) {
      const existingReview = await query(
        'SELECT id FROM reviews WHERE user_id = ? AND business_id = ?',
        [req.user.id, business_id]
      );

      if (existingReview.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this business'
        });
      }
    }

    if (listing_id) {
      const existingReview = await query(
        'SELECT id FROM reviews WHERE user_id = ? AND listing_id = ?',
        [req.user.id, listing_id]
      );

      if (existingReview.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this listing'
        });
      }
    }

    // Create review
    const result = await query(
      'INSERT INTO reviews (content, rating, user_id, business_id, listing_id) VALUES (?, ?, ?, ?, ?)',
      [content, rating, req.user.id, business_id || null, listing_id || null]
    );

    // Get created review
    const review = await query(
      \`SELECT r.*, u.name as user_name, u.avatar as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
  [result.insertId]
\
    )

res.status(201).json(
{
  success: true, data
  : review[0],
}
)
} catch (error)
{
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
    if (rating && (rating &lt;
    1 || rating > 5
    ))
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    })

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

