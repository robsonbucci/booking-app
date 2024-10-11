import request from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../src/models/User";

let mongoServer: MongoMemoryServer;
let validUser: any;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(() => {
  validUser = {
    username: "testuser",
    email: "test@me.com",
    password: "testpassword",
    isAdmin: false,
  };
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("TEST AUTH", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should return 201 status code when user is created with valid data", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);
      expect(response.statusCode).toBe(201);
    });

    it("should return 400 status code when data is invalid", async () => {
      const invalidUser = {
        ...validUser,
        username: "",
      };
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(invalidUser);
      expect(response.statusCode).toBe(500);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return 200 status code when user is logged in successfully", async () => {
      await request(app).post("/api/v1/auth/register").send(validUser);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      expect(response.statusCode).toBe(200);
    });

    it("should return 404 status code when user is not found", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "invalidemail", password: validUser.password });
      expect(response.statusCode).toBe(404);
    });

    it("should return 400 status code when password is incorrect", async () => {
      await request(app).post("/api/v1/auth/register").send(validUser);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: "invalidpassword",
      });
      expect(response.statusCode).toBe(400);
    });

    it("should return user object without password and isAdmin when login is successful", async () => {
      await request(app).post("/api/v1/auth/register").send(validUser);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      expect(response.body).not.toHaveProperty("password");
      expect(response.body).not.toHaveProperty("isAdmin");

    });
  });
});
