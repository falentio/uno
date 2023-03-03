import type { CardColor } from "./card"
import { Card } from "./card"

export class Deck {
	cards: Card[] = []
	#current: Card[] = []
	#history: Card[] = []

	constructor(cards: Card[]) {
		this.cards = cards
		this.shuffle()
	}

	history() {
		return Array.from(this.#history)
	}

	shuffle() {
		this.#current = Array
			.from(this.cards)
			.sort(() => Math.random() - 0.5)
	}

	draw(): Card {
		const [card] = this.cards.splice(0, 1)
		this.#history = [card, ...this.#history]
		return card
	}
}

export class StandardDeck extends Deck {
	static readonly cards = [
		new Card("black", "wild"),
		new Card("black", "wild"),
		new Card("black", "wild"),
		new Card("black", "wild"),
		
		new Card("black", "draw-4"),
		new Card("black", "draw-4"),
		new Card("black", "draw-4"),
		new Card("black", "draw-4"),
		
		...cardSets("red"),
		...cardSets("green"),
		...cardSets("blue"),
		...cardSets("yellow"),
	]

	constructor() {
		super(StandardDeck.cards)
	}
}

function cardSets(color: CardColor): Card[] {
	return [
		new Card(color, "0"),
		new Card(color, "1"),
		new Card(color, "2"),
		new Card(color, "3"),
		new Card(color, "4"),
		new Card(color, "5"),
		new Card(color, "6"),
		new Card(color, "7"),
		new Card(color, "8"),
		new Card(color, "9"),
		new Card(color, "reverse"),
		new Card(color, "block"),
		new Card(color, "draw-2"),
		new Card(color, "1"),
		new Card(color, "2"),
		new Card(color, "3"),
		new Card(color, "4"),
		new Card(color, "5"),
		new Card(color, "6"),
		new Card(color, "7"),
		new Card(color, "8"),
		new Card(color, "9"),
		new Card(color, "reverse"),
		new Card(color, "block"),
		new Card(color, "draw-2"),
	]
}