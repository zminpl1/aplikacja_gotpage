import { query } from "../config/db.js"

// @desc    Get all businesses
// @route   GET /api/businesses
// @access  Public
export const getBusinesses = async (req, res, next) => {
  try {
    // Initialize query parts
    let sql = `
      SELECT b.*, c.name as category_name, 
      (SELECT COUNT(*) FROM listings WHERE business_id = b.id) as listings_count,
      (SELECT AVG(rating) FROM reviews WHERE business_id = b.id) as rating,
      (SELECT COUNT(*) FROM reviews WHERE business_id = b.id) as reviews_count
      FROM businesses b
      LEFT JOIN categories c ON b.category_id = c.id
    `

    const queryParams = []
    const conditions = []

    // Filter by category
    if (req.query.category) {
      conditions.push("b.category_id = ?")
      queryParams.push(req.query.category)
    }

    // Filter by location
    if (req.query.location) {
      conditions.push("b.location LIKE ?")
      queryParams.push(`%${req.query.location}%`)
    }

    // Filter by name
    if (req.query.search) {
      conditions.push("(b.name LIKE ? OR b.description LIKE ?)")
      queryParams.push(`%${req.query.search}%`)
      queryParams.push(`%${req.query.search}%`)
    }

    // Filter by verified status
    if (req.query.verified) {
      conditions.push("b.verified = ?")
      queryParams.push(req.query.verified === "true" ? 1 : 0)
    }

    // Add WHERE clause if conditions exist
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`
    }

    // Add sorting
    const validSortFields = ["rating", "reviews_count", "listings_count", "created_at"]
    const sortField = validSortFields.includes(req.query.sort) ? req.query.sort : "created_at"
    const sortOrder = req.query.order === "asc" ? "ASC" : "DESC"

    sql += ` ORDER BY ${sortField} ${sortOrder}`

    // Add pagination
    const page = Number.parseInt(req.query.page, 10) || 1
    const limit = Number.parseInt(req.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    sql += " LIMIT ? OFFSET ?"
    queryParams.push(limit, startIndex)

    // Execute query
    const businesses = await query(sql, queryParams)

    // Get total count for pagination
    let countSql = "SELECT COUNT(*) as total FROM businesses b"
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
      count: businesses.length,
      data: businesses,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single business
// @route   GET /api/businesses/:id
// @access  Public
export const getBusiness = async (req, res, next) => {
  try {
    const business = await query(
      `SELECT b.*, c.name as category_name, u.name as owner_name,
       (SELECT AVG(rating) FROM reviews WHERE business_id = b.id) as rating,
       (SELECT COUNT(*) FROM reviews WHERE business_id = b.id) as reviews_count
       FROM businesses b
       LEFT JOIN categories c ON b.category_id = c.id
       LEFT JOIN users u ON b.user_id = u.id
       WHERE b.id = ?`,
      [req.params.id],
    )

    if (business.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    res.status(200).json({
      success: true,
      data: business[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new business
// @route   POST /api/businesses
// @access  Private
export const createBusiness = async (req, res, next) => {
  try {
    const {
      name,
      description,
      logo,
      cover_image,
      category_id,
      subcategory,
      location,
      phone,
      email,
      website,
      nip,
      working_hours,
      social_media,
      founded,
      employees,
    } = req.body

    // Validate required fields
    if (!name || !phone || !email || !nip) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, phone, email and NIP",
      })
    }

    // Check if business with this NIP already exists
    const existingBusiness = await query("SELECT id FROM businesses WHERE nip = ?", [nip])
    if (existingBusiness.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Business with this NIP already exists",
      })
    }

    // Create business
    const result = await query(
      `INSERT INTO businesses (
        name, description, logo, cover_image, category_id, subcategory,
        location, phone, email, website, nip, working_hours, social_media,
        founded, employees, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        logo || null,
        cover_image || null,
        category_id || null,
        subcategory || null,
        location || null,
        phone,
        email,
        website || null,
        nip,
        working_hours ? JSON.stringify(working_hours) : null,
        social_media ? JSON.stringify(social_media) : null,
        founded || null,
        employees || null,
        req.user.id,
      ],
    )

    // Get created business
    const business = await query("SELECT * FROM businesses WHERE id = ?", [result.insertId])

    res.status(201).json({
      success: true,
      data: business[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update business
// @route   PUT /api/businesses/:id
// @access  Private
export const updateBusiness = async (req, res, next) => {
  try {
    const {
      name,
      description,
      logo,
      cover_image,
      category_id,
      subcategory,
      location,
      phone,
      email,
      website,
      working_hours,
      social_media,
      founded,
      employees,
    } = req.body

    // Build update object
    const updateFields = []
    const values = []

    if (name) {
      updateFields.push("name = ?")
      values.push(name)
    }

    if (description !== undefined) {
      updateFields.push("description = ?")
      values.push(description)
    }

    if (logo !== undefined) {
      updateFields.push("logo = ?")
      values.push(logo)
    }

    if (cover_image !== undefined) {
      updateFields.push("cover_image = ?")
      values.push(cover_image)
    }

    if (category_id !== undefined) {
      updateFields.push("category_id = ?")
      values.push(category_id)
    }

    if (subcategory !== undefined) {
      updateFields.push("subcategory = ?")
      values.push(subcategory)
    }

    if (location !== undefined) {
      updateFields.push("location = ?")
      values.push(location)
    }

    if (phone) {
      updateFields.push("phone = ?")
      values.push(phone)
    }

    if (email) {
      updateFields.push("email = ?")
      values.push(email)
    }

    if (website !== undefined) {
      updateFields.push("website = ?")
      values.push(website)
    }

    if (working_hours !== undefined) {
      updateFields.push("working_hours = ?")
      values.push(working_hours ? JSON.stringify(working_hours) : null)
    }

    if (social_media !== undefined) {
      updateFields.push("social_media = ?")
      values.push(social_media ? JSON.stringify(social_media) : null)
    }

    if (founded !== undefined) {
      updateFields.push("founded = ?")
      values.push(founded)
    }

    if (employees !== undefined) {
      updateFields.push("employees = ?")
      values.push(employees)
    }

    // Add business ID to values array
    values.push(req.params.id)

    // Update business
    if (updateFields.length > 0) {
      await query(`UPDATE businesses SET ${updateFields.join(", ")} WHERE id = ?`, values)
    }

    // Get updated business
    const business = await query("SELECT * FROM businesses WHERE id = ?", [req.params.id])

    if (business.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    res.status(200).json({
      success: true,
      data: business[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete business
// @route   DELETE /api/businesses/:id
// @access  Private
export const deleteBusiness = async (req, res, next) => {
  try {
    // Check if business exists
    const business = await query("SELECT id FROM businesses WHERE id = ?", [req.params.id])

    if (business.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Delete business
    await query("DELETE FROM businesses WHERE id = ?", [req.params.id])

    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get business listings
// @route   GET /api/businesses/:id/listings
// @access  Public
export const getBusinessListings = async (req, res, next) => {
  try {
    const listings = await query(
      `SELECT l.*, c.name as category_name 
       FROM listings l
       LEFT JOIN categories c ON l.category_id = c.id
       WHERE l.business_id = ?
       ORDER BY l.featured DESC, l.created_at DESC`,
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

// @desc    Get business reviews
// @route   GET /api/businesses/:id/reviews
// @access  Public
export const getBusinessReviews = async (req, res, next) => {
  try {
    const reviews = await query(
      `SELECT r.*, u.name as user_name, u.avatar as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.business_id = ?
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

// @desc    Verify business
// @route   PUT /api/businesses/:id/verify
// @access  Private/Admin
export const verifyBusiness = async (req, res, next) => {
  try {
    // Check if business exists
    const business = await query("SELECT id, verified FROM businesses WHERE id = ?", [req.params.id])

    if (business.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Toggle verification status
    const newStatus = !business[0].verified

    // Update business
    await query("UPDATE businesses SET verified = ? WHERE id = ?", [newStatus, req.params.id])

    res.status(200).json({
      success: true,
      message: `Business ${newStatus ? "verified" : "unverified"} successfully`,
      verified: newStatus,
    })
  } catch (error) {
    next(error)
  }
}

