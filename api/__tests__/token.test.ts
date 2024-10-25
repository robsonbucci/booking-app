import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import User from "../src/models/User";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let validUser: any;

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

  await request(app).post("/api/v1/auth/register").send(validUser);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe.skip("TEST TOKEN", () => {
  describe("GET /api/v1/user/checkauthentication", () => {
    it("should return 200 status code when token is valid", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      const token = response.headers["set-cookie"][0];

      const result = await request(app)
        .get("/api/v1/user/checkauthentication")
        .set("Cookie", [token]);

      expect(result.statusCode).toBe(200);
    });

    it("should return 403 status code when token is invalid", async () => {
      const result = await request(app)
        .get("/api/v1/user/checkauthentication")
        .set("Cookie", ["access_token=invalidtoken"]);
      expect(result.statusCode).toBe(403);
    });

    it("should return 401 status code when token is missing", async () => {
      const result = await request(app).get("/api/v1/user/checkauthentication");
      expect(result.statusCode).toBe(401);
    });
  });

  describe("GET /api/v1/user/checkuser", () => {
    it("should return 200 status code when user is valid", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      const token = response.headers["set-cookie"][0];

      const result = await request(app)
        .get(`/api/v1/user/checkuser/${response.body._id}`)
        .set("Cookie", [token]);

      expect(result.statusCode).toBe(200);
    });

    it("should return 403 status code when user is invalid", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      const token = response.headers["set-cookie"][0];

      const result = await request(app)
        .get("/api/v1/user/checkuser/123456789")
        .set("Cookie", [token]);
      expect(result.statusCode).toBe(403);
    });
  });

  describe("GET /api/v1/user/checkadmin", () => {
    it("should return 200 status code when user is valid", async () => {
      const adminUser = {
        username: "adminuser",
        email: "admin@me.com",
        password: "adminpassword",
        isAdmin: true,
      };
      await request(app).post("/api/v1/auth/register").send(adminUser);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: adminUser.email,
        password: adminUser.password,
      });

      const token = response.headers["set-cookie"][0];
      const result = await request(app)
        .get("/api/v1/user/checkadmin")
        .set("Cookie", [token]);

      expect(result.statusCode).toBe(200);
    });
    it("should return 403 status code when user is invalid", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      const token = response.headers["set-cookie"][0];

      const result = await request(app)
        .get("/api/v1/user/checkadmin")
        .set("Cookie", [token]);
      expect(result.statusCode).toBe(403);
    });
  });
});
