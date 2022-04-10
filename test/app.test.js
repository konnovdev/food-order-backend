import app from "../app.js"
import supertest from "supertest"
const request = supertest(app)

describe("/restaurants endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get("/restaurants")
        expect(response.status).toBe(200)
    })
})

describe("/order endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get("/order")
        expect(response.status).toBe(200)
    })
})

