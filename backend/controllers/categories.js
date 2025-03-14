import { query } from "../config/db.js"

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await query(
      `SELECT c.*, 
       (SELECT COUNT(*) FROM listings WHERE category_id = c.id) as listings_count
       FROM categories c
       ORDER BY c.name ASC`,
    )

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const category = await query(
      `SELECT c.*, 
       (SELECT COUNT(*) FROM listings WHERE category_id = c.id) as listings_count
       FROM categories c
       WHERE c.id = ?`,
      [req.params.id],
    )

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    res.status(200).json({
      success: true,
      data: category[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, icon, color } = req.body

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name for the category",
      })
    }

    // Check if category already exists
    const existingCategory = await query("SELECT id FROM categories WHERE name = ?", [name])
    if (existingCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      })
    }

    // Create category
    const result = await query("INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)", [
      name,
      icon || null,
      color || null,
    ])

    // Get created category
    const category = await query("SELECT * FROM categories WHERE id = ?", [result.insertId])

    res.status(201).json({
      success: true,
      data: category[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    const { name, icon, color } = req.body

    // Build update object
    const updateFields = []
    const values = []

    if (name) {
      updateFields.push("name = ?")
      values.push(name)
    }

    if (icon !== undefined) {
      updateFields.push("icon = ?")
      values.push(icon)
    }

    if (color !== undefined) {
      updateFields.push("color = ?")
      values.push(color)
    }

    // Add category ID to values array
    values.push(req.params.id)

    // Update category
    if (updateFields.length > 0) {
      await query(`UPDATE categories SET ${updateFields.join(", ")} WHERE id = ?`, values)
    }

    // Get updated category
    const category = await query("SELECT * FROM categories WHERE id = ?", [req.params.id])

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    res.status(200).json({
      success: true,
      data: category[0],
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    // Check if category exists
    const category = await query("SELECT id FROM categories WHERE id = ?", [req.params.id])

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // Check if category has listings
    const listings = await query("SELECT COUNT(*) as count FROM listings WHERE category_id = ?", [req.params.id])
    if (listings[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with associated listings",
      })
    }

    // Delete category
    await query("DELETE FROM categories WHERE id = ?", [req.params.id])

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get listings by category
// @route   GET /api/categories/:id/listings
// @access  Public
export const getCategoryListings = async (req, res, next) => {
  try {
    const listings = await query(
      `SELECT l.*, 
       COALESCE(b.name, u.name) as owner_name,
       COALESCE(b.verified, 0) as owner_verified
       FROM listings l
       LEFT JOIN businesses b ON l.business_id = b.id
       LEFT JOIN users u ON l.user_id = u.id
       WHERE l.category_id = ?
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

