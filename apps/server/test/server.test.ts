import { WaitGroup } from "@jpwilliams/waitgroup";
import { Card } from "@uno/core";
import { io as Client } from "socket.io-client";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { createServer } from "../src/index";

describe("server", () => {
	const { server, io, app, games } = createServer();
	let clientA: Client;
	let clientB: Client;
	let clientC: Client;
	let gameId: string;

	beforeAll(() => {
		server.listen(() => {
			const port = server.address().port;
			const addr = `http://localhost:${port}`;
			clientA = new Client(addr);
			clientB = new Client(addr);
			clientC = new Client(addr);
		});

		return () => server.close();
	});

	afterEach(() => {
		clientA.offAny();
		clientB.offAny();
		clientC.offAny();
	});

	it("create", async () => {
		const wg = new WaitGroup();
		wg.add(1);
		clientA.once("created", id => {
			gameId = id;
			wg.done();
		});
		clientA.emit("create");
		await wg.wait();
		expect(gameId).toBeTruthy();
		expect(games().length).toBe(1);
	});

	it("join", async () => {
		const wg = new WaitGroup();
		wg.add(3);
		clientA.once(`game:${gameId}:state`, (k, v) => {
			expect(k).toEqual("players");
			expect(v.length).toEqual(2);
			wg.done();
		});
		clientA.once(`game:${gameId}:join`, id => {
			expect(id).toBeTruthy();
			wg.done();
		});
		clientB.once(`game:${gameId}:join`, id => {
			expect(id).toBeTruthy();
			wg.done();
		});
		clientB.emit("join", gameId);
		await wg.wait();
	});

	it("start", async () => {
		const wg = new WaitGroup();
		wg.add(1);
		clientA.once(`game:${gameId}:start`, () => {
			wg.done();
		});
		clientA.emit("start", gameId);
		await wg.wait();
	});

	it("play", async () => {
		const game = games().find(g => g.id === gameId);
		const wg = new WaitGroup();
		game.state.counter = 0;
		game.currentPlayer().add([new Card("black", "wild")]);
		wg.add(1);
		clientA.emit("play", gameId, new Card("blue", "wild"));
		clientB.on(`game:{gameId}:state`, (k, v) => {
			if (k !== "cardHistory") {
				return;
			}
			expect(v[v.length - 1][0]).toEqual({ color: "blue", type: "wild" });
			wg.done();
		});
		await wg.wait();
	});

	it("leave", async () => {
		const wg = new WaitGroup();
		wg.add(2);
		clientA.once(`game:${gameId}:leave`, id => {
			expect(id).toBeTruthy();
			wg.done();
		});
		clientB.once(`game:${gameId}:leave`, id => {
			expect(id).toBeTruthy();
			wg.done();
		});
		clientB.emit("leave", gameId);
		await wg.wait();
	});
});
