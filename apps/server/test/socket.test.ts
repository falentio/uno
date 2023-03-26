import { WaitGroup } from "@jpwilliams/waitgroup";
import { Card } from "@uno/core";
import { io as Client } from "socket.io-client";
import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	type Mock,
	vi,
} from "vitest";
import { createServer } from "../src/index";
import { UnoClient } from "@uno/client"

interface Context {
	errorCallback: Mock<[], void>;
}

describe("socket", () => {
	const { server, io, app, games } = createServer();
	let clientA: Client;
	let clientB: Client;
	let clientC: Client;
	let unoClient: UnoClient;
	let gameId: string;

	function assertState(rec, exp) {
		const a = JSON.parse(JSON.stringify(rec))
		const b = JSON.parse(JSON.stringify(exp))
		expect(a).toBe(b)
	}

	beforeAll(() => {
		server.listen(() => {
			const port = server.address().port;
			const addr = `ws://localhost:${port}?name=`;
			clientA = Client(addr + "A");
			clientB = Client(addr + "B");
			clientC = Client(addr + "C");
			clientA.on("connect_error", e => console.error(e))
			unoClient = new UnoClient(`ws://localhost:${port}`, "client");
		});
	});

	afterEach(() => {
		clientA.offAny();
		clientB.offAny();
		clientC.offAny();
	});

	beforeEach<Context>(ctx => {
		const fn = vi.fn((e) => {
			console.error(e)
		});
		clientA.on("error", fn);
		clientB.on("error", fn);
		clientC.on("error", fn);
		unoClient.socket.on("error", fn)
		ctx.errorCallback = fn;
	});

	describe("create", () => {
		it.concurrent<Context>("should be able to create", async (ctx) => {
			const wg = new WaitGroup();
			wg.add(1);
			clientA.once("created", id => {
				gameId = id;
				wg.done();
			});
			clientA.emit("create");
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
			expect(gameId).toBeTruthy();
			expect(games().length).toBe(1);
		});
	});

	describe("join", () => {
		it.concurrent<Context>("should be able to join", async (ctx) => {
			const wg = new WaitGroup();
			wg.add(4);
			clientA.once("state", (id, k, v) => {
				expect(id).toEqual(gameId);
				expect(k).toEqual("players");
				expect(v.length).toEqual(2);
				wg.done();
			});
			clientA.once("join", id => {
				expect(id).toBeTruthy();
				wg.done();
			});
			clientB.once("join", id => {
				expect(id).toBeTruthy();
				wg.done();
			});
			unoClient.socket.once("join", id => {
				wg.done();
			})
			unoClient.join(gameId)
			clientB.emit("join", gameId);
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
			expect(unoClient.games.has(gameId)).toBe(true)
		});
	});

	describe("start", () => {
		it.concurrent<Context>("should be able to start", async (ctx) => {
			const wg = new WaitGroup();
			wg.add(1);
			clientA.once("start", (id) => {
				expect(id).toBe(gameId)
				wg.done();
			});
			clientA.emit("start", gameId);
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
			assertState(unoClient.games.get(gameId)!.state, games()[0].state)
		});
	});

	describe("play", () => {
		it.concurrent<Context>("should be able to play", async (ctx) => {
			const game = games().find(g => g.id === gameId);
			const wg = new WaitGroup();
			wg.add(2);
			game.state.counter = 0;
			game.currentPlayer().add([new Card("black", "draw-4")]);
			clientA.emit("play", gameId, new Card("blue", "draw-4"));
			clientB.on("state", (id, k, v) => {
				if (k !== "cardsHistory" || v.length < 2) {
					return;
				}
				expect(id).toEqual(gameId);
				expect(v[v.length - 1][0]).toEqual({
					color: "blue",
					type: "draw-4",
				});
				expect(v.length).toEqual(2);
				wg.done();
			});
			clientA.on("state", (id, k, v) => {
				if (k !== "cardsHistory" || v.length < 2) {
					return;
				}
				expect(id).toEqual(gameId);
				expect(v[v.length - 1][0]).toEqual({
					color: "blue",
					type: "draw-4",
				});
				expect(v.length).toEqual(2);
				wg.done();
			});
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
		});
	});

	describe("leave", () => {
		it.concurrent<Context>("should be able to leave", async (ctx) => {
			const wg = new WaitGroup();
			wg.add(2);
			clientA.once("leave", id => {
				expect(id).toBeTruthy();
				wg.done();
			});
			clientB.once("leave", id => {
				expect(id).toBeTruthy();
				wg.done();
			});
			clientB.emit("leave", gameId);
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
		});
	});
});
