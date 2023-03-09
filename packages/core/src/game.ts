import { Emitter } from "./emitter"
import { State, state } from "./state"
import { Card } from "./card"
import { Player } from "./player"
import { Deck, StandardDeck } from "./deck"

export type GameState = {
	clockwise: boolean
	started: boolean
	counter: number
	players: Player[]
	cardsHistory: [Card, Player][]
	owner: Player
	cardInDeck: number
}

export type GameEvents = {
	stateChange: [k: string, v: unknown]
	gameStart: [Game]
	gameEnd: [Game]

	cardPlayed: [Game, Card, Player]

	turnStart: [Game, Player]
	turnEnd: [Game, Player]
}

export class Game extends Emitter<GameEvents> {
	id = Math.random().toString(36).slice(2, 10)
	deck = new StandardDeck()
	state = state<GameState>({
		clockwise: true,
		started: false,
		ended: false,
		counter: 0,
		players: [],
		cardsHistory: [],
		owner: new Player(""),
		cardInDeck: 0.
	})

	constructor(
		owner: Player,
	) {
		super()
		this.state.on("change", (a) => {
			this.emit("stateChange", a)
		})
		this.state.owner = owner
		this.state.players.push(owner)
		this.state.change("players")
	}

	currentPlayer(): Player {
		return this.state.players[this.state.counter % this.state.players.length]
	}

	join(name: string) {
		if (this.state.started) {
			throw new Error("can not join started game")
		}
		if (this.state.players.length >= 4) {
			throw new Error("game fulll")
		}
		const p = new Player(name)
		this.state.players.push(p)
		this.state.change("players")
		return p
	}

	leave(name: string) {
		const p = this.state.players.find(p => p.name === name)
		if (!p) {
			return null
		}
		if (this.state.started) {
			p.leave = true
		} else {
			this.state.players = this.state.players.filter(i => i !== p)
		}
		if (p === this.currentPlayer()) {
			this.nextTurn()
		}
		this.state.change("players")
		return p
	}

	start() {
		this.state.started = true
		this.state.ended = false
		this.state.counter = Math.random() * 0xff | 0
		this.state.cardsHistory = this.deck.mustDraw(1)
		this.state.players.forEach(p => {
			const cards = this.deck.mustDraw(7)
			p.add(cards)
		})
		this.emit("gameStart", [this])
		this.nextTurn()
	}

	end() {
		this.state.ended = true
		this.emit("gameEnd", [this])
	}

	play(card: Card) {
		const p = this.currentPlayer()
		if (!p.hasCard(card)) {
			throw new Error("can not play unknown card")
		}

		const prev = this.state.cardsHistory.at(-1)!
		if (!card.playable(prev)) {
			throw new Error("can not play this card")
		}
		
		p.remove(card)
		this.state.cardsHistory.push(card.clone())
		this.emit("cardPlayed", [this, card, p])
	}

	nextTurn() {
		for (let i = 0; i < 4; i++) {
			this.state.counter += 1
			if (!this.currentPlayer().leave) {
				const cards = this.deck.mustDraw(1)
				this.currentPlayer().add(cards)
				this.emit("turnStart", [this, this.currentPlayer()])
				return 
			}
		}

		throw new Error("all player already leave")
	}
}
