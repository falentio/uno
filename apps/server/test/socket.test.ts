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

interface Context {
	errorCallback: Mock<[], void>;
}

describe("socket", () => {
	const { server, io, app, games } = createServer();
	let clientA: Client;
	let clientB: Client;
	let clientC: Client;
	let gameId: string;

	beforeAll(() => {
		server.listen(() => {
			const port = server.address().port;
			const addr = `http://localhost:${port}?name=`;
			clientA = new Client(addr + "A");
			clientB = new Client(addr + "B");
			clientC = new Client(addr + "C");
		});
		return () => server.close();
	});

	afterEach(() => {
		clientA.offAny();
		clientB.offAny();
		clientC.offAny();
	});

	beforeEach<Context>(ctx => {
		const fn = vi.fn(() => {});
		clientA.on("error", fn);
		clientB.on("error", fn);
		clientC.on("error", fn);
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
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
		});
	});

	describe("start", () => {
		it.concurrent<Context>("should be able to start", async (ctx) => {
			const wg = new WaitGroup();
			wg.add(1);
			clientA.once(`game:${gameId}:start`, () => {
				wg.done();
			});
			clientA.emit("start", gameId);
			await wg.wait();
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
		});
	});

	describe("play", () => {
		it.concurrent<Context>("should be able to play", async (ctx) => {
			const game = games().find(g => g.id === gameId);
			const wg = new WaitGroup();
			wg.add(2);
			game.state.counter = 0;
			game.currentPlayer().add([new Card("black", "wild")]);
			clientA.emit("play", gameId, new Card("blue", "wild"));
			clientB.on(`game:${gameId}:state`, (k, v) => {
				if (k !== "cardsHistory") {
					return;
				}
				expect(v[v.length - 1][0]).toEqual({
					color: "blue",
					type: "wild",
				});
				expect(v.length).toEqual(2);
				wg.done();
			});
			clientA.on(`game:${gameId}:state`, (k, v) => {
				if (k !== "cardsHistory") {
					return;
				}
				expect(v[v.length - 1][0]).toEqual({
					color: "blue",
					type: "wild",
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
			expect(ctx.errorCallback).toHaveBeenCalledTimes(0);
		});
	});
});
