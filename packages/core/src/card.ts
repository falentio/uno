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
		public type: CardType,
		public color: CardColor,
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
		return new Card(t, c)
	}

	id() {
		const t = cardType.indexOf(this.type)
		const c = cardColor.indexOf(this.color)
		return c << 4 | t
	}
}