import { con } from "../config/dbconfig.js";
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";


async function queryDatabase(query, values) {
  console.log("Executing query:", query);
  console.log("Query parameters:", values);

  return new Promise((resolve, reject) => {
    con.query(query, values, (err, result) => {
      if (err) {
        console.error("Query error:", err);
        reject(err);
      } else {
        console.log("Query result:", result);
        resolve(result);
      }
    });
  });
}



export const register = async (req, res) => {
  try {
    const { email, set_username, confirm_password, first_name, last_name } =
      req.body;

    // Check if the email is already registered
    const emailCheckQuery = "SELECT * FROM registration WHERE email = ?";
    const emailCheckValues = [email];
    const emailCheckResult = await queryDatabase(
      emailCheckQuery,
      emailCheckValues
    );

    if (emailCheckResult.length > 0) {
      return res.status(400).json({
        status: false,
        message: "email is already registered",
      });
    }

    // Check if the username is already registered
    const usernameCheckQuery =
      "SELECT * FROM registration WHERE set_username = ?";
    const usernameCheckValues = [set_username];
    const usernameCheckResult = await queryDatabase(
      usernameCheckQuery,
      usernameCheckValues
    );

    if (usernameCheckResult.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Username is already registered",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(confirm_password, 10);
    const insertUserQuery = "INSERT INTO registration (first_name, last_name, email, set_username, confirm_password) VALUES (?, ?, ?, ?, ?)";
    const insertUserValues = [first_name, last_name, email, set_username, hashedPassword];

    await queryDatabase(insertUserQuery, insertUserValues);

    console.log("User registration successful");  // Update log message

    return res.status(200).json({
      status: true,
      message: "User registration successful",  // Update response message
    });
  } catch (error) {
    console.error("Error during registration:", error);

    // Log detailed information about the error
    if (error.code === 'ER_DUP_ENTRY') {
      console.error("Duplicate entry error. Unique constraint violated.");
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};



export const login = async (req, res) => {
  try {
    const { set_username, confirm_password } = req.body;

    console.log("Request Body:", req.body);

    // Check if the username exists
    const userQuery = "SELECT * FROM registration WHERE set_username = ?";
    const userValues = [set_username];
    const userResult = await queryDatabase(userQuery, userValues);

    if (userResult.length === 0) {
      console.error("User not found for login:", set_username);

      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const user = userResult[0]; // Assuming you only expect one user

    // Log the retrieved hashed password and the entered password
    const storedHashedPassword = user.confirm_password;

    console.log("Retrieved Hashed Password:", storedHashedPassword);
    console.log("Entered Password:", confirm_password);

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(confirm_password, storedHashedPassword);

    if (!passwordMatch) {
      console.error("Login failed for user:", set_username);

      console.log("Stored Password (hashed):", storedHashedPassword);
      console.log("Entered Password:", confirm_password);

      return res.status(401).json({
        status: false,
        message: "Incorrect password",
        details: "Password does not match the stored hash.",
      });
    }

    // If the password matches, you can redirect to the admin dashboard or send a success message
    return res.status(200).json({
      status: true,
      message: "Login successful",
      // You can add additional data if needed
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message || "An unexpected error occurred",
    });
  }
};
