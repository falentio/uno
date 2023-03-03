import type { Deck } from "./deck"
import type { Card } from "./card"
import { Emitter } from "strict-event-emitter"
import { writable, Writable } from "sveltejs/store"

export type GameEvents = {
	start: [Game]

	turnStart: [Game, Player]
	turnEnd: [Game, Player]

	cardPlaced: [Game, Player, Card]
}

export type GameState = {
	clockwise: boolean
}

export class Game extends Emitter<GameEvents> {
	rules: Rule[] = []
	state = writable<GameState>({
		clockwise: true,	
	})
	constructor(
		public deck: Deck,
		public players: Player[],
	) {
		super()
		this.createRuleHandler()
	}

	private createRuleHandler()) {
		const events = [
			"start",
		] as (keyof GameEvents)[]
		events.forEach(name => {
			this.on(name, (...a) => {
				for (const f of this.rules) {
					f[name](...a)
				}
			})
		})
	}
}

export class Player {
	hand: Card[] = []

	constructor() {}
}

export type Rule = {
	[K in keyof GameEvents]: (...args: GameEvents[K]) => void
}

export abstract class RuleBase implements Rule {
	start(g: Game) {}

	turnStart(g: Game, p: Player) {}
	turnEnd(g: Game, p: Player) {}

	cardPlaced(g: Game, p: Player, c: Card)
}