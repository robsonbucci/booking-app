import request from "supertest";
import app from "../src/app";

describe("POST /hotels", () => { 
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
        }

        const response = await request(app).post("/hotels").send(newHotel);
        expect(response.statusCode).toBe(200);
    }) 
})