import { describe, it, expect, test } from "vitest"
import {
	Game,
	Player,
	Card,
} from "../src/index"

describe("game", () => {
	const owner = new Player("owner")
	const game = new Game(owner)

	it("join", () => {
		expect(game.join("foo")).toBeTruthy()
		expect(game.state.players.length).toEqual(2)

		expect(game.join("bar")).toBeTruthy()
		expect(game.state.players.length).toEqual(3)

		expect(game.join("baz")).toBeTruthy()
		expect(game.state.players.length).toEqual(4)

		expect(() => game.join("qux")).toThrow(/full/)
	})

	it("start", () => {
		expect(() => game.start()).not.toThrow()
		expect(game.state.started).toEqual(true)
		expect(game.state.counter).not.toEqual(0)
		expect(() => game.join("qux")).toThrow(/started/)
		expect(game.state.cardsHistory.at(-1)).toBeTruthy()
	})

	it.each(game.state.players)("player $name", (p) => {
		let cardCount = 7
		if (game.currentPlayer() === p) {
			cardCount++
		}
		expect(p.hand().length).toEqual(cardCount)
	})

	it("play", () => {
		const p = game.currentPlayer()
		const c = new Card("black", "wild")
		p.add([c])
		expect(p.hand().length).toEqual(9)
		expect(() => game.play(new Card("blue", "wild"))).not.toThrow()
		expect(p.hand().length).toEqual(8)
		expect(game.state.cardsHistory.at(-1)).toBeTruthy()
		expect(game.state.cardsHistory.at(-1)!.equal(c)).toEqual(true)
	})
})
