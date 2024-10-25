import request from "supertest";
import app from "../src/app";
import Hotel from "../src/models/Hotel";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;
let validHotel: any;
let adminToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  validHotel = {
    name: "Test Hotel",
    type: "hotel",
    city: "berlin",
    address: "Test Address",
    distance: "500",
    photos: ["Test Photos"],
    description: "Test Description",
    cheapestPrice: 100,
  };

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
  await Hotel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("TEST HOTELS", () => {
  describe("POST /api/v1/hotels", () => {
    it("should return 201 status code when hotel is created with valid data", async () => {
      const response = await request(app)
        .post("/api/v1/hotels")
        .set("Cookie", [adminToken])
        .send(validHotel);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("name", validHotel.name);
    });

    it("should return 400 status code when data is invalid", async () => {
      const invalidHotel = {
        ...validHotel,
        name: "",
      };
      const response = await request(app)
        .post("/api/v1/hotels")
        .set("Cookie", [adminToken])
        .send(invalidHotel);
      expect(response.statusCode).toBe(500);
    });
  });

  describe("PUT /api/v1/hotels:id", () => {
    it("should return 200 status code when hotel is updated successfully", async () => {
      const newHotel = await Hotel.create(validHotel);

      const updatedHotel = {
        name: "Udpated Hotel",
      };

      const response = await request(app)
        .put(`/api/v1/hotels/${newHotel._id}`)
        .set("Cookie", [adminToken])
        .send(updatedHotel);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name", updatedHotel.name);
    });

    it("should return 500 status code when ID is invalid", async () => {
      const updatedHotel = {
        name: "Udpated Hotel",
      };

      const response = await request(app)
        .put("/api/v1/hotels/1234567890")
        .set("Cookie", [adminToken])
        .send(updatedHotel);

      expect(response.statusCode).toBe(500);
    });
  });

  describe("DELETE /api/v1/hotels:id", () => {
    it("should return 200 status code when hotel is deleted successfully", async () => {
      const newHotel = await Hotel.create(validHotel);

      const response = await request(app)
        .delete(`/api/v1/hotels/${newHotel._id}`)
        .set("Cookie", [adminToken]);
      expect(response.statusCode).toBe(204);
    });

    it("should return 500 status code when ID is invalid", async () => {
      const response = await request(app)
        .delete("/api/v1/hotels/23456789")
        .set("Cookie", [adminToken]);
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /api/v1/hotels/:id", () => {
    it("should return 200 status code when a hotel is fetched successfully", async () => {
      const newHotel = await Hotel.create(validHotel);
      const response = await request(app).get(`/api/v1/hotels/${newHotel._id}`);
      expect(response.statusCode).toBe(200);
    });

    it("should return 500 status code when ID is invalid", async () => {
      const response = await request(app).get("/api/v1/hotels/123456789");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /api/v1/hotels/", () => {
    it("should return 200 status code when a list of hotels is fetched successfully", async () => {
      const response = await request(app).get("/api/v1/hotels");
      expect(response.statusCode).toBe(200);
    });
  });
});
