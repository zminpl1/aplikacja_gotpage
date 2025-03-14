import { initDatabase, testConnection } from "../config/db.js"
import dotenv from "dotenv"

// Load env vars
dotenv.config()

const main = async () => {
  try {
    // Test database connection
    const connected = await testConnection()

    if (!connected) {
      console.error("Failed to connect to database. Check your configuration.")
      process.exit(1)
    }

    // Initialize database tables
    await initDatabase()

    console.log("Database initialization completed successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error initializing database:", error)
    process.exit(1)
  }
}

main()

