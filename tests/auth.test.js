const db = require("./config/db");
const request = require("supertest");
const server = require("../server");

let agent;

beforeAll(async () => {
  await db.connect();
  agent = request.agent(server);
});
afterEach(async () => {
  await server.close();
});
afterAll(async () => {
  await db.disconnect();
  await server.close();
});

describe("Authentication", () => {
  it("should register a new user", async () => {
    const response = await agent.post("/auth/register").send({
      surname: "Tester",
      otherNames: "User One",
      email: "one@tester.com",
      password: "test@password",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    const response = await agent.post("/auth/login").send({
      email: "one@tester.com",
      password: "test@password",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User logged in successfully");
    expect(response.body.data.accessToken).toBeTruthy();
  });
});
