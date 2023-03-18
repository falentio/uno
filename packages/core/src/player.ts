import { Card, CardType, CardColor } from "./card";

export class Player {
	#hand: Card[] = [];
	leave = false;
	constructor(
		public name: string,
	) {}

	add(cards: Card[]) {
		this.#hand = this.#hand.concat(cards);
	}

	hand() {
		return Array.from(this.#hand);
	}

	remove(c: Card) {
		const toRm = this.#hand.find(cc => cc.equal(c));
		this.#hand = this.#hand.filter(cc => toRm !== cc);
	}

	hasCard(card: Card): boolean {
		return !!this.hand().find(c => c.equal(card));
	}

	hasCardType(t: CardType[]): boolean {
		return !!this.hand().find(c => t.includes(c.type))
	}

	hasCardColor(t: CardColor[]): boolean {
		return !!this.hand().find(c => t.includes(c.color))
	}

	hasPlayableCard(prev: Card) {
		return !!this.hand().find(c => c.playable(prev));
	}

	hasChainableCard(prev: Card) {
		return !!this.hand().find(c => {
			if (prev.type === "wild") {
				return this.hasCardColor([prev.color]) && this.hasCardType([
					"0",
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
				])
			}
			return c.playable(prev)
		})
	}
}
