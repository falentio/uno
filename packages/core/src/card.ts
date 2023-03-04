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
]

export type CardType = (typeof cardType)[number]

export const cardColor = [
	"black",
	"red",
	"green",
	"blue",
	"yellow",
]

export type CardColor = (typeof cardColor)[number]

export class Card {
	constructor(
		public type: CardType,
		public color: CardColor,
	) {}

	bytesTuple(): [number, number] {
		return [
			cardType.indexOf(this.type),
			cardColor.indexOf(this.color),
		]
	}

	id() {
		const [t, c] = this.bytesTuple()
		return t << 8 | c
	}
}