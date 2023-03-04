export const cardType: readonly ["wild", "draw-4", "draw-2", "reverse", "skip", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export type CardType = (typeof cardType)[number];
export const cardColor: readonly ["black", "red", "green", "blue", "yellow"];
export type CardColor = (typeof cardColor)[number];
export class Card {
    type: CardType;
    color: CardColor;
    constructor(type: CardType, color: CardColor);
    static fromId(id: number): Card;
    id(): number;
}

//# sourceMappingURL=index.d.ts.map
