// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  // Default error status and message
  let statusCode = err.statusCode || 500
  let message = err.message || "Server Error"

  // Handle specific error types
  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 400
    message = "Duplicate entry. This record already exists."

    // Extract more specific information from the error message
    if (err.sqlMessage) {
      if (err.sqlMessage.includes("email")) {
        message = "This email is already registered."
      } else if (err.sqlMessage.includes("phone")) {
        message = "This phone number is already registered."
      } else if (err.sqlMessage.includes("nip")) {
        message = "This NIP (Tax ID) is already registered."
      }
    }
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    statusCode = 400
    const errors = Object.values(err.errors).map((val) => val.message)
    message = errors.join(", ")
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401
    message = "Invalid token. Please log in again."
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401
    message = "Your session has expired. Please log in again."
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  })
}

