import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { query } from "../config/db.js"
import { sendEmail } from "../utils/sendEmail.js"

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, accountType } = req.body

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      })
    }

    // Check if user already exists
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [email])
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const result = await query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ])

    // If it's a business account, create business record
    if (accountType === "business" && req.body.businessName && req.body.nip && req.body.phone) {
      await query("INSERT INTO businesses (name, nip, phone, email, user_id) VALUES (?, ?, ?, ?, ?)", [
        req.body.businessName,
        req.body.nip,
        req.body.phone,
        email,
        result.insertId,
      ])
    }

    // Generate token
    const token = generateToken(result.insertId)

    // Set cookie
    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }

    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "User registered successfully",
      token,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Check if user exists
    const users = await query("SELECT id, name, email, password, role FROM users WHERE email = ?", [email])

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    const user = users[0]

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Generate token
    const token = generateToken(user.id)

    // Set cookie
    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }

    // Remove password from response
    delete user.password

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  })
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await query(
      "SELECT id, name, email, avatar, cover_image, location, bio, phone, member_since, role FROM users WHERE id = ?",
      [req.user.id],
    )

    // Check if user has a business
    const business = await query("SELECT id, name FROM businesses WHERE user_id = ?", [req.user.id])

    res.status(200).json({
      success: true,
      data: {
        ...user[0],
        business: business.length > 0 ? business[0] : null,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validate
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      })
    }

    // Get user with password
    const users = await query("SELECT password FROM users WHERE id = ?", [req.user.id])

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, users[0].password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password
    await query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.user.id])

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email",
      })
    }

    // Check if user exists
    const users = await query("SELECT id FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user with that email",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Set expire (10 min)
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000

    // Store token in database
    await query("UPDATE users SET reset_password_token = ?, reset_password_expire = ? WHERE email = ?", [
      resetPasswordToken,
      resetPasswordExpire,
      email,
    ])

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`

    // Create message
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

    try {
      await sendEmail({
        email,
        subject: "Password reset token",
        message,
      })

      res.status(200).json({
        success: true,
        message: "Email sent",
      })
    } catch (err) {
      console.error("Email send error:", err)

      // Clear reset token fields in database
      await query("UPDATE users SET reset_password_token = NULL, reset_password_expire = NULL WHERE email = ?", [email])

      return res.status(500).json({
        success: false,
        message: "Email could not be sent",
      })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetToken = req.params.resetToken
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Find user with valid token
    const users = await query("SELECT id FROM users WHERE reset_password_token = ? AND reset_password_expire > ?", [
      resetPasswordToken,
      Date.now(),
    ])

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      })
    }

    // Set new password
    const { password } = req.body
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a new password",
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user
    await query(
      "UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expire = NULL WHERE id = ?",
      [hashedPassword, users[0].id],
    )

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    next(error)
  }
}

