export const cardType: readonly ["wild", "draw-4", "draw-2", "reverse", "skip", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export type CardType = (typeof cardType)[number];
export const cardColor: readonly ["black", "red", "green", "blue", "yellow"];
export type CardColor = (typeof cardColor)[number];
export class Card {
    readonly color: CardColor;
    readonly type: CardType;
    constructor(color: CardColor, type: CardType);
    static fromId(id: number): Card;
    static fromIds(ids: number[]): Card[];
    clone(): Card;
    id(): number;
    valid(): boolean;
    equal(card: Card): boolean;
    playable(prev: Card): boolean;
}
export class Deck {
    #private;
    cards: Card[];
    constructor(cards: Card[]);
    current(): Card[];
    reset(): void;
    shuffle(): void;
    draw(c: number): Card[];
    mustDraw(c: number): Card[];
}
export class StandardDeck extends Deck {
    static readonly cards: Card[];
    constructor();
}
export class Player {
    #private;
    name: string;
    constructor(name: string);
    hand(): Card[];
    hasCard(card: Card): boolean;
}
export class Emitter<T = {}> {
    #private;
    on<K extends keyof T, L extends (v: T[K]) => void>(k: K, l: L): () => void;
    emit<K extends keyof T>(k: K, v: T[K]): void;
}
export type StateEvents = {
    change: [k: string, v: unknown];
};
export type State<T> = T & Emitter<StateEvents> & StateMethod;
export type StateMethod = {
    reset(): void;
};
export function state<T extends Record<string, unknown> = {}>(v: T): State<T>;
export class Game {
}

//# sourceMappingURL=index.d.ts.map
