import { describe, it, vi, expect }from "vitest"
import { io as Client } from "socket.io-client"
import { createServer } from "../src/index"
import { WaitGroup } from "@jpwilliams/waitgroup"

const defer = () => {
	let resolve
	const p = new Promise<unknown[]>(r => resolve = r)
	return [p, (...a) => resolve(a)]
}

describe("server", () => {
	const { server, io, app, games } = createServer()
	let clientA: Client
	let clientB: Client
	let gameId: string
	server.listen(() => {
		const port = server.address().port
		const addr = `http://localhost:${port}`
		clientA = new Client(addr)
		clientB = new Client(addr)
	})

	it("create", async () => {
		const wg = new WaitGroup()
		wg.add(1)
		clientA.once("created", id => {
			gameId = id
			wg.done()
		})
		clientA.emit("create");
		await wg.wait()
		expect(gameId).toBeTruthy()
		expect(games().length).toBe(1)
	})

	it("join", async () => {
		const wg = new WaitGroup()
		wg.add(3)
		clientA.once(`game:${gameId}:state`, (k, v) => {
			expect(k).toEqual("players")
			expect(v.length).toEqual(2)
			wg.done()
		})
		clientA.once(`game:${gameId}:join`, id => {
			expect(id).toBeTruthy()
			wg.done()
		})
		clientB.once(`game:${gameId}:join`, id => {
			expect(id).toBeTruthy()
			wg.done()
		})
		clientB.emit("join", gameId)
		await wg.wait()
	})

	it("leave", async () => {
		const wg = new WaitGroup()
		wg.add(3)
		clientA.once(`game:${gameId}:state`, (k, v) => {
			expect(k).toEqual("players")
			expect(v.length).toEqual(1)
			wg.done()
		})
		clientA.once(`game:${gameId}:leave`, id => {
			expect(id).toBeTruthy()
			wg.done()
		})
		clientB.once(`game:${gameId}:leave`, id => {
			expect(id).toBeTruthy()
			wg.done()
		})
		clientB.emit("leave", gameId)
		await wg.wait()
	})
})