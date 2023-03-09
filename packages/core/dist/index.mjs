function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $411c2a56a582c453$exports = {};

$parcel$export($411c2a56a582c453$exports, "cardType", () => $411c2a56a582c453$export$28c6a4757357ecf);
$parcel$export($411c2a56a582c453$exports, "cardColor", () => $411c2a56a582c453$export$7371e516c83e77f1);
$parcel$export($411c2a56a582c453$exports, "Card", () => $411c2a56a582c453$export$60332b2344f7fe41);
const $411c2a56a582c453$export$28c6a4757357ecf = [
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
    "9"
];
const $411c2a56a582c453$export$7371e516c83e77f1 = [
    "black",
    "red",
    "green",
    "blue",
    "yellow"
];
class $411c2a56a582c453$export$60332b2344f7fe41 {
    constructor(color, type){
        this.color = color;
        this.type = type;
    }
    static fromId(id) {
        const t = $411c2a56a582c453$export$28c6a4757357ecf[id & 0xf];
        if (!t) throw new Error("invalid cardType");
        const c = $411c2a56a582c453$export$7371e516c83e77f1[id >>> 4 & 0xf];
        if (!c) throw new Error("invalid cardColor");
        return new $411c2a56a582c453$export$60332b2344f7fe41(c, t);
    }
    static fromIds(ids) {
        return ids.map((id)=>$411c2a56a582c453$export$60332b2344f7fe41.fromId(id));
    }
    clone() {
        return new $411c2a56a582c453$export$60332b2344f7fe41(this.color, this.type);
    }
    id() {
        const t = $411c2a56a582c453$export$28c6a4757357ecf.indexOf(this.type);
        const c = $411c2a56a582c453$export$7371e516c83e77f1.indexOf(this.color);
        return c << 4 | t;
    }
    valid() {
        if (this.color === "black") return [
            "wild",
            "draw-4"
        ].includes(this.type);
        return true;
    }
    equal(card) {
        if ([
            "wild",
            "draw-4"
        ].includes(this.type)) return card.type === this.type;
        return this.type === card.type && this.color === card.color;
    }
    playable(prev) {
        if ([
            "wild",
            "draw-4"
        ].includes(this.type)) return true;
        if (this.color === prev.color) return true;
        if (this.type === prev.type) return true;
        return false;
    }
}


var $eacb8680117124dc$exports = {};

$parcel$export($eacb8680117124dc$exports, "Deck", () => $eacb8680117124dc$export$9b013bad9d0245d0);
$parcel$export($eacb8680117124dc$exports, "StandardDeck", () => $eacb8680117124dc$export$8b859321d6a2a89a);

class $eacb8680117124dc$export$9b013bad9d0245d0 {
    cards = [];
    #current = [];
    constructor(cards){
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
        this.#current = this.current().sort(()=>Math.random() - 0.5);
    }
    draw(c) {
        return this.cards.splice(0, c);
    }
    mustDraw(c) {
        const card = this.draw(c);
        if (card.length < c) throw new Error("not enough card remaining");
        return card;
    }
}
class $eacb8680117124dc$export$8b859321d6a2a89a extends $eacb8680117124dc$export$9b013bad9d0245d0 {
    static cards = [
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "wild"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "wild"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "wild"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "wild"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)("black", "draw-4"),
        ...$eacb8680117124dc$var$cardSets("red"),
        ...$eacb8680117124dc$var$cardSets("green"),
        ...$eacb8680117124dc$var$cardSets("blue"),
        ...$eacb8680117124dc$var$cardSets("yellow")
    ];
    constructor(){
        super($eacb8680117124dc$export$8b859321d6a2a89a.cards);
    }
}
function $eacb8680117124dc$var$cardSets(color) {
    return [
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "0"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "1"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "2"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "3"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "4"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "5"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "6"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "7"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "8"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "9"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "reverse"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "skip"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "draw-2"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "1"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "2"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "3"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "4"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "5"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "6"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "7"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "8"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "9"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "reverse"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "skip"),
        new (0, $411c2a56a582c453$export$60332b2344f7fe41)(color, "draw-2")
    ];
}


var $8db3dbc86f73c435$exports = {};

$parcel$export($8db3dbc86f73c435$exports, "Player", () => $8db3dbc86f73c435$export$2616165974278734);
class $8db3dbc86f73c435$export$2616165974278734 {
    #hand;
    constructor(name){
        this.name = name;
        this.#hand = [];
    }
    hand() {
        return Array.from(this.#hand);
    }
    hasCard(card) {
        return !!this.hand().find((c)=>c.equal(card));
    }
}


var $91aa7180cc9d6053$exports = {};

$parcel$export($91aa7180cc9d6053$exports, "Game", () => $91aa7180cc9d6053$export$985739bfa5723e08);
class $91aa7180cc9d6053$export$985739bfa5723e08 {
}


var $aa1d1b4e66042c99$exports = {};

$parcel$export($aa1d1b4e66042c99$exports, "Emitter", () => $aa1d1b4e66042c99$export$4293555f241ae35a);
class $aa1d1b4e66042c99$export$4293555f241ae35a {
    #listeners = {};
    on(k, l) {
        const ls = this.#listeners[k] ??= [];
        ls.push(l);
        return ()=>{
            this.#listeners[k] = this.#listeners[k].filter((fn)=>fn !== l);
        };
    }
    emit(k, v) {
        const ls = this.#listeners[k] ??= [];
        ls.forEach((f)=>f(v));
    }
}


var $6edd9f8d9ec0459b$exports = {};

$parcel$export($6edd9f8d9ec0459b$exports, "state", () => $6edd9f8d9ec0459b$export$ca000e230c0caa3e);

function $6edd9f8d9ec0459b$export$ca000e230c0caa3e(v) {
    let s = Object.assign({}, v);
    const e = new (0, $aa1d1b4e66042c99$export$4293555f241ae35a)();
    const method = {
        reset () {
            s = Object.assign({}, v);
        },
        change (k) {
            e.emit("change", [
                k,
                s[k]
            ]);
        }
    };
    return new Proxy(e, {
        get (target, key, receivver) {
            if (key in e) return e[key];
            if (key in method) return method[key];
            if (key in s) return s[key];
        },
        set (target, key, value, receivver) {
            s[key] = value;
            method.change(key);
            return true;
        }
    });
}




export {$411c2a56a582c453$export$28c6a4757357ecf as cardType, $411c2a56a582c453$export$7371e516c83e77f1 as cardColor, $411c2a56a582c453$export$60332b2344f7fe41 as Card, $eacb8680117124dc$export$9b013bad9d0245d0 as Deck, $eacb8680117124dc$export$8b859321d6a2a89a as StandardDeck, $8db3dbc86f73c435$export$2616165974278734 as Player, $91aa7180cc9d6053$export$985739bfa5723e08 as Game, $aa1d1b4e66042c99$export$4293555f241ae35a as Emitter, $6edd9f8d9ec0459b$export$ca000e230c0caa3e as state};
//# sourceMappingURL=index.mjs.map
