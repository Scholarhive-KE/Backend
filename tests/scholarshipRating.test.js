const db = require("./config/db");
const request = require("supertest");
const app = require("../server");

let agent;

beforeAll(async () => {
  await db.connect();
  agent = request.agent(app);
});

beforeEach(async () => {
  await db.clear();
  app.close();
});

afterAll(async () => {
  await db.disconnect();
});

describe("Authentication", () => {
  it("should register a new user", async () => {
    const response = await agent.post("/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User registered successfully");
  });

  // Add more test cases here
});
