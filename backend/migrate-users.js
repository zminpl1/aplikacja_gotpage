import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

// Database connection configuration
// Both databases are on the same server
const dbConfig = {
  host: "s11.cyber-folks.pl",
  user: "biycgepwzk_backend",
  password: "UcHxI5R-8%RH-jv!",
}

// Specific database names
const WP_DATABASE = "biycgepwzk_wp3" // WordPress database
const GOTPAGE_DATABASE = "biycgepwzk_gotpage" // New Gotpage database

async function migrateUsers() {
  // Create a single connection to the database server
  const connection = await mysql.createConnection({
    ...dbConfig,
    multipleStatements: true, // Allow multiple statements for database switching
  })

  try {
    console.log("Starting user migration from WordPress to Gotpage...")
    console.log(`Source database: ${WP_DATABASE}`)
    console.log(`Target database: ${GOTPAGE_DATABASE}`)

    // Check if the users table exists in the Gotpage database
    await connection.query(`USE ${GOTPAGE_DATABASE}`)
    const [userTables] = await connection.query("SHOW TABLES LIKE 'users'")
    const [businessTables] = await connection.query("SHOW TABLES LIKE 'business'")

    if (userTables.length === 0 || businessTables.length === 0) {
      console.log("Tables not found in Gotpage database. Creating them...")

      // Create tables if they don't exist
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          login VARCHAR(255) NOT NULL,
          name VARCHAR(255),
          nick VARCHAR(255),
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          avatar VARCHAR(255),
          cover_image VARCHAR(255),
          location VARCHAR(255),
          bio TEXT,
          phone VARCHAR(50) UNIQUE,
          member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          role ENUM('user', 'admin') DEFAULT 'user',
          reset_password_token VARCHAR(255),
          reset_password_expire BIGINT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS business (
          id INT AUTO_INCREMENT PRIMARY KEY,
          login VARCHAR(255) NOT NULL,
          name VARCHAR(255),
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          nip VARCHAR(255),
          avatar VARCHAR(255),
          cover_image VARCHAR(255),
          location VARCHAR(255),
          bio TEXT,
          phone VARCHAR(50) UNIQUE,
          member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          role ENUM('user', 'admin') DEFAULT 'user',
          reset_password_token VARCHAR(255),
          reset_password_expire BIGINT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `)
      console.log("Tables created successfully.")
    }

    // Get all users from WordPress database
    await connection.query(`USE ${WP_DATABASE}`)
    const [wpUsers] = await connection.query('SELECT * FROM wp_users WHERE user_url = ""')

    await connection.query(`USE ${WP_DATABASE}`)
    const [wpBusinesses] = await connection.query('SELECT * FROM wp_users WHERE user_url != "" ')

    console.log(`Found ${wpUsers.length} WordPress users to migrate`)
    console.log(`Found ${wpBusinesses.length} WordPress Businesses to migrate`)

    // Switch back to Gotpage database for insertion
    await connection.query(`USE ${GOTPAGE_DATABASE}`)

    // Counter for statistics
    let migratedUsers = 0
    let migratedBusinesses = 0
    let skippedUsers = 0
    let skippedBusinesses = 0
    let errors = 0

    // Migrate regular users
    for (const wpUser of wpUsers) {
      try {
        // Clean and validate email
        const email = wpUser.user_email ? wpUser.user_email.toLowerCase().trim() : ""

        // Skip users with invalid emails
        if (!email || !email.includes("@")) {
          console.log(`Skipping user ${wpUser.user_login} - Invalid email: ${email}`)
          skippedUsers++
          continue
        }

        // Check if user already exists in Gotpage database
        const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email])

        if (existingUser.length > 0) {
          console.log(`Skipping user ${wpUser.user_login} - Email already exists in Gotpage database`)
          skippedUsers++
          continue
        }

        // Extract and clean user data
        // Map WordPress fields to Gotpage fields
        const login = wpUser.user_login || ""
        let name = wpUser.display_name || ""
        const nick = wpUser.user_nicename || ""

        // Clean name but preserve Polish characters
        name = name.replace(/[^\w\s\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, "").trim()

        // Get additional data if available
        const lastName = wpUser.user_nazwisko ? wpUser.user_nazwisko.trim() : ""

        // If we have a last name and it's not already in the name, append it
        if (lastName && !name.includes(lastName)) {
          name = `${name} ${lastName}`
        }

        // Ensure name is not empty and fits in the field
        name = name || "User"
        name = name.substring(0, 255)

        // Create a secure password hash (users will need to reset)
        const password = await bcrypt.hash(Math.random().toString(36), 10)

        // Prepare registration date
        const memberSince = wpUser.user_registered || new Date()

        // Insert user into Gotpage database
        const [result] = await connection.query(
          `INSERT INTO users (
            login, name, nick, email, password, member_since, role, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [login, name, nick, email, password, memberSince, "user"],
        )

        console.log(`Migrated user: ${email} (ID: ${result.insertId})`)
        migratedUsers++

        // Create a password reset token for the user
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

        const resetPasswordExpire = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days

        await connection.query("UPDATE users SET reset_password_token = ?, reset_password_expire = ? WHERE id = ?", [
          resetPasswordToken,
          resetPasswordExpire,
          result.insertId,
        ])
      } catch (error) {
        console.error(`Error migrating user ${wpUser.user_login}:`, error.message)
        errors++
      }
    }

    // Migrate businesses
    for (const wpBusiness of wpBusinesses) {
      try {
        // Clean and validate email
        const email = wpBusiness.user_email ? wpBusiness.user_email.toLowerCase().trim() : ""

        // Skip businesses with invalid emails
        if (!email || !email.includes("@")) {
          console.log(`Skipping business ${wpBusiness.user_login} - Invalid email: ${email}`)
          skippedBusinesses++
          continue
        }

        // Check if business already exists in Gotpage database
        const [existingBusiness] = await connection.query("SELECT id FROM business WHERE email = ?", [email])

        if (existingBusiness.length > 0) {
          console.log(`Skipping business ${wpBusiness.user_login} - Email already exists in Gotpage database`)
          skippedBusinesses++
          continue
        }

        // Extract and clean business data
        const login = wpBusiness.user_login || ""
        let name = wpBusiness.display_name || wpBusiness.user_nicename || ""

        // Clean name but preserve Polish characters
        name = name.replace(/[^\w\s\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, "").trim()

        // Get additional data if available
        const lastName = wpBusiness.user_nazwisko ? wpBusiness.user_nazwisko.trim() : ""

        // If we have a last name and it's not already in the name, append it
        if (lastName && !name.includes(lastName)) {
          name = `${name} ${lastName}`
        }

        // Ensure name is not empty and fits in the field
        name = name || "Firma"
        name = name.substring(0, 255)

        // Create a secure password hash (businesses will need to reset)
        const password = await bcrypt.hash(Math.random().toString(36), 10)

        // Prepare registration date
        const memberSince = wpBusiness.user_registered || new Date()

        // Insert business into Gotpage database
        const [result] = await connection.query(
          `INSERT INTO business (
              login, name, email, password, member_since, role, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [login, name, email, password, memberSince, "user"],
        )

        console.log(`Migrated business: ${email} (ID: ${result.insertId})`)
        migratedBusinesses++

        // Create a password reset token for the business
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

        const resetPasswordExpire = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days

        await connection.query("UPDATE business SET reset_password_token = ?, reset_password_expire = ? WHERE id = ?", [
          resetPasswordToken,
          resetPasswordExpire,
          result.insertId,
        ])
      } catch (error) {
        console.error(`Error migrating business ${wpBusiness.user_login}:`, error.message)
        errors++
      }
    }

    // Print migration statistics
    console.log("\nMigration completed!")
    console.log("-------------------")
    console.log(`Total users processed: ${wpUsers.length}`)
    console.log(`Total businesses processed: ${wpBusinesses.length}`)
    console.log(`Successfully migrated users: ${migratedUsers}`)
    console.log(`Successfully migrated businesses: ${migratedBusinesses}`)
    console.log(`Skipped users: ${skippedUsers}`)
    console.log(`Skipped businesses: ${skippedBusinesses}`)
    console.log(`Errors: ${errors}`)
  } catch (error) {
    console.error("Migration failed:", error)
  } finally {
    // Close database connection
    await connection.end()
  }
}

// Run the migration
migrateUsers().catch(console.error)

