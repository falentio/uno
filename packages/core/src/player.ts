import { Card } from "./card"

export class Player {
	#hand: Card[] = []
	leave = false
	constructor(
		public name: string,
	) {}

	add(cards: Card[]) {
		this.#hand = this.#hand.concat(cards)
	}

	hand() {
		return Array.from(this.#hand)
	}

	remove(c: Card) {
		const toRm = this.#hand.find(cc => cc.equal(c))
		this.#hand = this.#hand.filter(cc => toRm !== cc)
	}

	hasCard(card: Card): boolean {
		return !!this.hand().find(c => c.equal(card))
	}
}