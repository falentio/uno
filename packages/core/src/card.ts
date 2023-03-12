export const cardType = [
	"wild",
	"draw-4",
	"draw-2",
	"reverse",
	"skip",
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
] as const

export type CardType = (typeof cardType)[number]

export const cardColor = [
	"black",
	"red",
	"green",
	"blue",
	"yellow",
] as const

export type CardColor = (typeof cardColor)[number]

export class Card {
	constructor(
		public readonly color: CardColor,
		public readonly type: CardType,
	) {}

	static fromId(id: number) {
		const t = cardType[id & 0xf]
		if (!t) {
			throw new Error("invalid cardType")
		}
		const c = cardColor[id >>> 4 & 0xf]
		if (!c) {
			throw new Error("invalid cardColor")
		}
		return new Card(c, t)
	}

	static fromIds(ids: number[]) {
		return ids.map(id => Card.fromId(id)) as Card[]
	}

	static clone(card: Card) {
		return new Card(card.color, card.type)
	}

	clone() {
		return new Card(this.color, this.type)
	}

	id() {
		const t = cardType.indexOf(this.type)
		const c = cardColor.indexOf(this.color)
		return c << 4 | t
	}

	valid(): boolean {
		if (this.color === "black") {
			return ["wild", "draw-4"].includes(this.type)
		}
		return true
	}

	equal(card: Card) {
		if (["wild", "draw-4"].includes(this.type)) {
			return card.type === this.type
		}
		return this.type === card.type && this.color === card.color
	}

	playable(prev: Card) {
		if (["wild", "draw-4"].includes(this.type)) {
			return true
		}
		if (this.color === prev.color) {
			return true
		}
		if (this.type === prev.type) {
			return true
		}
		return false
	}
}