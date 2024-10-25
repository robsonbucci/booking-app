import request from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../src/models/User";
let mongoServer: MongoMemoryServer;
let validUser: any;
let userToken: string;
let adminToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  validUser = {
    username: "testuser",
    email: "test@me.com",
    password: "testpassword",
    isAdmin: false,
  };

  const response = await request(app)
    .post("/api/v1/auth/register")
    .send(validUser);

  const userLogin = await request(app).post("/api/v1/auth/login").send({
    email: validUser.email,
    password: validUser.password,
  });

  if (userLogin.headers["set-cookie"]) {
    userToken = userLogin.headers["set-cookie"][0].split(";")[0];
  }

  const adminUser = {
    username: "adminuser",
    email: "admin@me.com",
    password: "adminpassword",
    isAdmin: true,
  };

  await request(app).post("/api/v1/auth/register").send(adminUser);

  const adminLogin = await request(app).post("/api/v1/auth/login").send({
    email: adminUser.email,
    password: adminUser.password,
  });

  if (adminLogin.headers["set-cookie"]) {
    adminToken = adminLogin.headers["set-cookie"][0].split(";")[0];
  }
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("TEST USER", () => {
  describe("PUT /api/v1/user", () => {
    it("should return 200 status code when user is updated successfully", async () => {
      const updatedUser = {
        username: "updateduser",
        email: "updated@me.com",
        password: "updatedpassword",
        isAdmin: true,
      };

      const user = await User.findOne({ email: validUser.email });
      if (!user) {
        return;
      }

      const response = await request(app)
        .put(`/api/v1/user/${user._id}`)
        .set("Cookie", [userToken])
        .send(updatedUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("username", updatedUser.username);
      expect(response.body).toHaveProperty("email", updatedUser.email);
      expect(response.body).toHaveProperty("isAdmin", updatedUser.isAdmin);
    });
  });

  describe(" DELETE /api/v1/user/:id", () => {
    it("should return 204 status code when user is deleted successfully", async () => {
      const user = await User.findOne({ email: validUser.email });
      if (!user) {
        return;
      }

      const response = await request(app)
        .delete(`/api/v1/user/${user._id}`)
        .set("Cookie", [userToken]);
      expect(response.statusCode).toBe(204);
    });
  });

  describe("GET /api/v1/user/:id", () => {
    it("should return 200 status code when user is fetched successfully", async () => {
      const user = await User.findOne({ email: validUser.email });
      if (!user) {
        return;
      }

      const response = await request(app)
        .get(`/api/v1/user/${user._id}`)
        .set("Cookie", [userToken]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /api/v1/user/", () => {
    it("should return 200 status code when a list of users is fetched successfully", async () => {
      const response = await request(app)
        .get("/api/v1/user")
        .set("Cookie", [adminToken]);
      expect(response.statusCode).toBe(200);
    });
  });
});
