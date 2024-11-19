import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import User from "./models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Rate limiter middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  message: "Too many requests, please try again later.",
});

// Validation and sanitization middleware
const validateRegistration = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage("Username must be 3-30 characters long.")
    .isAlphanumeric().withMessage("Username must only contain letters and numbers.")
    .escape(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/).withMessage("Password must contain at least one digit.")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character.")
    .escape(),
];

const validateLogin = [
  body("username").trim().escape(),
  body("password").escape(),
];

// Register route
router.post(
  "/user",
  authLimiter,
  validateRegistration,
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).send("User already exists.");
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create and save the user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).send("Registration successful.");
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).send("An error occurred.");
    }
  }
);

// Login route
router.post(
  "/login",
  authLimiter,
  validateLogin,
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, password } = req.body;

    try {
      // Find the user in the database
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send("Invalid credentials.");
        return;
      }

      // Generate a secure JWT token
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: "1h",
        algorithm: "HS256",
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("An error occurred.");
    }
  }
);

export default router;
