function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c8f77d9e23a393a2$exports = {};

$parcel$export($c8f77d9e23a393a2$exports, "cardType", () => $c8f77d9e23a393a2$export$28c6a4757357ecf);
$parcel$export($c8f77d9e23a393a2$exports, "cardColor", () => $c8f77d9e23a393a2$export$7371e516c83e77f1);
$parcel$export($c8f77d9e23a393a2$exports, "Card", () => $c8f77d9e23a393a2$export$60332b2344f7fe41);
const $c8f77d9e23a393a2$export$28c6a4757357ecf = [
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
const $c8f77d9e23a393a2$export$7371e516c83e77f1 = [
    "black",
    "red",
    "green",
    "blue",
    "yellow"
];
class $c8f77d9e23a393a2$export$60332b2344f7fe41 {
    constructor(color, type){
        this.color = color;
        this.type = type;
    }
    static fromId(id) {
        const t = $c8f77d9e23a393a2$export$28c6a4757357ecf[id & 0xf];
        if (!t) throw new Error("invalid cardType");
        const c = $c8f77d9e23a393a2$export$7371e516c83e77f1[id >>> 4 & 0xf];
        if (!c) throw new Error("invalid cardColor");
        return new $c8f77d9e23a393a2$export$60332b2344f7fe41(c, t);
    }
    static fromIds(ids) {
        return ids.map((id)=>$c8f77d9e23a393a2$export$60332b2344f7fe41.fromId(id));
    }
    clone() {
        return new $c8f77d9e23a393a2$export$60332b2344f7fe41(this.color, this.type);
    }
    id() {
        const t = $c8f77d9e23a393a2$export$28c6a4757357ecf.indexOf(this.type);
        const c = $c8f77d9e23a393a2$export$7371e516c83e77f1.indexOf(this.color);
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


var $f2c4d33ac1d52299$exports = {};

$parcel$export($f2c4d33ac1d52299$exports, "Deck", () => $f2c4d33ac1d52299$export$9b013bad9d0245d0);
$parcel$export($f2c4d33ac1d52299$exports, "StandardDeck", () => $f2c4d33ac1d52299$export$8b859321d6a2a89a);

class $f2c4d33ac1d52299$export$9b013bad9d0245d0 {
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
class $f2c4d33ac1d52299$export$8b859321d6a2a89a extends $f2c4d33ac1d52299$export$9b013bad9d0245d0 {
    static cards = [
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "wild"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "wild"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "wild"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "wild"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "draw-4"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)("black", "draw-4"),
        ...$f2c4d33ac1d52299$var$cardSets("red"),
        ...$f2c4d33ac1d52299$var$cardSets("green"),
        ...$f2c4d33ac1d52299$var$cardSets("blue"),
        ...$f2c4d33ac1d52299$var$cardSets("yellow")
    ];
    constructor(){
        super($f2c4d33ac1d52299$export$8b859321d6a2a89a.cards);
    }
}
function $f2c4d33ac1d52299$var$cardSets(color) {
    return [
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "0"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "1"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "2"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "3"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "4"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "5"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "6"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "7"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "8"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "9"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "reverse"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "skip"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "draw-2"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "1"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "2"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "3"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "4"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "5"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "6"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "7"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "8"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "9"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "reverse"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "skip"),
        new (0, $c8f77d9e23a393a2$export$60332b2344f7fe41)(color, "draw-2")
    ];
}


var $3f76ea9ae27413aa$exports = {};

$parcel$export($3f76ea9ae27413aa$exports, "Player", () => $3f76ea9ae27413aa$export$2616165974278734);
class $3f76ea9ae27413aa$export$2616165974278734 {
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


var $60e447d486ac378a$exports = {};

$parcel$export($60e447d486ac378a$exports, "Game", () => $60e447d486ac378a$export$985739bfa5723e08);
class $60e447d486ac378a$export$985739bfa5723e08 {
}


var $6acc250229db7f51$exports = {};

$parcel$export($6acc250229db7f51$exports, "Emitter", () => $6acc250229db7f51$export$4293555f241ae35a);
class $6acc250229db7f51$export$4293555f241ae35a {
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


var $aea9ecba54283eef$exports = {};

$parcel$export($aea9ecba54283eef$exports, "state", () => $aea9ecba54283eef$export$ca000e230c0caa3e);

function $aea9ecba54283eef$export$ca000e230c0caa3e(v) {
    let s = Object.assign({}, v);
    const e = new (0, $6acc250229db7f51$export$4293555f241ae35a)();
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


$parcel$exportWildcard(module.exports, $c8f77d9e23a393a2$exports);
$parcel$exportWildcard(module.exports, $f2c4d33ac1d52299$exports);
$parcel$exportWildcard(module.exports, $3f76ea9ae27413aa$exports);
$parcel$exportWildcard(module.exports, $60e447d486ac378a$exports);
$parcel$exportWildcard(module.exports, $6acc250229db7f51$exports);
$parcel$exportWildcard(module.exports, $aea9ecba54283eef$exports);


//# sourceMappingURL=index.js.map
