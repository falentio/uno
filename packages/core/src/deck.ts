import type { CardColor } from "./card";
import { Card } from "./card";
import { UnoError } from "./error"

export class Deck {
	cards: Card[] = [];
	#current: Card[] = [];

	constructor(cards: Card[]) {
		this.cards = cards;
		this.reset();
	}

	current() {
		return Array.from(this.#current);
	}

	reset() {
		this.#current = Array.from(this.cards);
		this.shuffle();
	}

	shuffle() {
		this.#current = this
			.current()
			.sort(() => Math.random() - 0.5);
	}

	draw(c: number): Card[] {
		return this.#current.splice(0, c);
	}

	mustDraw(c: number) {
		const card = this.draw(c);
		if (card.length < c) {
			throw new UnoError("not enough card remaining");
		}
		return card;
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
	];

	constructor() {
		super(StandardDeck.cards);
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
		new Card(color, "skip"),
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
		new Card(color, "skip"),
		new Card(color, "draw-2"),
	];
}
