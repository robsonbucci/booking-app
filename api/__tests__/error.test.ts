import { ErrorFactory } from "../src/utils/error";

describe("ErrorFactory", () => {
    it("should create an error with status code 500 and message", () => {
        const error = ErrorFactory.createError(500, "Internal Server Error");
        expect((error as any).status).toBe(500);
        expect(error.message).toBe("Internal Server Error");
    });
})