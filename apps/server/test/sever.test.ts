import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { createServer } from "../src/index";

describe("server", () => {
	const { server } = createServer();

	describe("healthcheck", () => {
		it("should ok", async () => {
			const response = await supertest(server)
				.get("/health")
				.expect(200);

			expect(response).toBeTruthy();
		});
	});
});
