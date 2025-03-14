import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log("Database connection established successfully")
    connection.release()
    return true
  } catch (error) {
    console.error("Database connection failed:", error.message)
    return false
  }
}

// Execute query with parameters
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Query error:", error.message)
    throw error
  }
}

// Initialize database tables if they don't exist
const initDatabase = async () => {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        cover_image VARCHAR(255),
        location VARCHAR(255),
        bio TEXT,
        phone VARCHAR(50),
        member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create businesses table
    await query(`
      CREATE TABLE IF NOT EXISTS businesses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        logo VARCHAR(255),
        cover_image VARCHAR(255),
        category_id INT,
        subcategory VARCHAR(255),
        location VARCHAR(255),
        phone VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        nip VARCHAR(20) NOT NULL UNIQUE,
        working_hours JSON,
        social_media JSON,
        founded VARCHAR(50),
        employees VARCHAR(50),
        verified BOOLEAN DEFAULT FALSE,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)

    // Create categories table
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon VARCHAR(50),
        color VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create listings table
    await query(`
      CREATE TABLE IF NOT EXISTS listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        images JSON,
        price VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        category_id INT,
        featured BOOLEAN DEFAULT FALSE,
        user_id INT,
        business_id INT,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `)

    // Create reviews table
    await query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        rating INT NOT NULL,
        user_id INT NOT NULL,
        business_id INT,
        listing_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
      )
    `)

    // Create saved_listings table (for users to save listings)
    await query(`
      CREATE TABLE IF NOT EXISTS saved_listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        listing_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
        UNIQUE KEY unique_saved_listing (user_id, listing_id)
      )
    `)

    // Create messages table
    await query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        listing_id INT,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL
      )
    `)

    // Insert default categories if they don't exist
    const categories = [
      { name: "Real Estate", icon: "Home", color: "bg-blue-500/10 text-blue-500" },
      { name: "Retail", icon: "ShoppingBag", color: "bg-green-500/10 text-green-500" },
      { name: "Food & Dining", icon: "Utensils", color: "bg-orange-500/10 text-orange-500" },
      { name: "Automotive", icon: "Car", color: "bg-red-500/10 text-red-500" },
      { name: "Professional Services", icon: "Briefcase", color: "bg-purple-500/10 text-purple-500" },
      { name: "Beauty & Wellness", icon: "Scissors", color: "bg-pink-500/10 text-pink-500" },
      { name: "Technology", icon: "Laptop", color: "bg-indigo-500/10 text-indigo-500" },
      { name: "Corporate", icon: "Building2", color: "bg-gray-500/10 text-gray-500" },
      { name: "Accommodation", icon: "Bed", color: "bg-yellow-500/10 text-yellow-500" },
      { name: "Transport", icon: "Bus", color: "bg-cyan-500/10 text-cyan-500" },
      { name: "Education", icon: "GraduationCap", color: "bg-emerald-500/10 text-emerald-500" },
      { name: "Entertainment", icon: "Music", color: "bg-violet-500/10 text-violet-500" },
    ]

    const existingCategories = await query("SELECT * FROM categories")
    if (existingCategories.length === 0) {
      for (const category of categories) {
        await query("INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)", [
          category.name,
          category.icon,
          category.color,
        ])
      }
      console.log("Default categories inserted")
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization failed:", error.message)
    throw error
  }
}

export { pool, query, testConnection, initDatabase }

