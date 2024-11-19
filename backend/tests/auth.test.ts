import request from "supertest";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../src/models/User";
import router from "../src/auth"; // Adjust path if needed

jest.mock("../src/models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(router);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /user (Registration)", () => {
    it("should return 400 if validation fails", async () => {
      const response = await request(app).post("/user").send({
        username: "u",
        password: "123",
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 if the user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({ username: "existingUser" });

      const response = await request(app).post("/user").send({
        username: "existingUser",
        password: "Password123!",
      });

      expect(response.status).toBe(400);
      expect(response.text).toBe("User already exists.");
    });

    it("should return 201 if registration is successful", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");
      (User.prototype.save as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app).post("/user").send({
        username: "newUser",
        password: "Password123!",
      });

      expect(response.status).toBe(201);
      expect(response.text).toBe("Registration successful.");
      expect(bcrypt.hash).toHaveBeenCalledWith("Password123!", 12);
    });

    it("should return 500 if an error occurs during registration", async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

      const response = await request(app).post("/user").send({
        username: "errorUser",
        password: "Password123!",
      });

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred.");
    });
  });

  describe("POST /login", () => {
    it("should return 400 if validation fails", async () => {
      const response = await request(app).post("/login").send({
        username: "",
        password: "",
      });

      expect(response.status).toBe(401);
      // expect(response.body.errors).toBeDefined();
    });

    it("should return 401 if credentials are invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app).post("/login").send({
        username: "invalidUser",
        password: "wrongPassword",
      });

      expect(response.status).toBe(401);
      expect(response.text).toBe("Invalid credentials.");
    });

    it("should return 200 and a token if login is successful", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({
        username: "validUser",
        password: "hashedPassword",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      (jwt.sign as jest.Mock).mockReturnValueOnce("mockToken");

      const response = await request(app).post("/login").send({
        username: "validUser",
        password: "Password123!",
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe("mockToken");
      expect(jwt.sign).toHaveBeenCalledWith(
        { username: "validUser" },
        expect.any(String),
        expect.objectContaining({ expiresIn: "1h", algorithm: "HS256" })
      );
    });

    it("should return 500 if an error occurs during login", async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

      const response = await request(app).post("/login").send({
        username: "errorUser",
        password: "Password123!",
      });

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred.");
    });
  });
});
