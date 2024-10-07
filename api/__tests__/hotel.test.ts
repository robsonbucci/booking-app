import request from "supertest";
import app from "../src/app";
import Hotel from "../src/models/Hotel";

// Mock do modelo inteiro
jest.mock("../src/models/Hotel", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        _id: "ObjectId('123456789')",
        name: "Test Hotel",
        type: "hotel",
        city: "berlin",
        address: "Test Address",
        distance: "500",
        photos: ["Test Photos"],
        title: "Test Title",
        description: "Test Description",
        rooms: ["Test Room"],
        cheapestPrice: 100,
        featured: false,
      }),
    };
  });
});

describe("POST /api/v1/hotels", () => {
  it("should return 200 status code when hotel is created successfully", async () => {
    const newHotel = {
      name: "Test Hotel",
      type: "hotel",
      city: "berlin",
      address: "Test Address",
      distance: "500",
      photos: "Test Photos",
      description: "Test Description",
      cheapestPrice: 100,
    };

    const response = await request(app).post("/api/v1/hotels").send(newHotel);
    expect(response.statusCode).toBe(200);
    expect(Hotel).toHaveBeenCalledTimes(1);
    expect(response.body).toHaveProperty("_id");
  });
});
