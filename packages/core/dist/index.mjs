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
    constructor(type, color){
        this.type = type;
        this.color = color;
    }
    static fromId(id) {
        const t = $411c2a56a582c453$export$28c6a4757357ecf[id & 0xf];
        if (!t) throw new Error("invalid cardType");
        const c = $411c2a56a582c453$export$7371e516c83e77f1[id >>> 4 & 0xf];
        if (!c) throw new Error("invalid cardColor");
        return new $411c2a56a582c453$export$60332b2344f7fe41(t, c);
    }
    id() {
        const t = $411c2a56a582c453$export$28c6a4757357ecf.indexOf(this.type);
        const c = $411c2a56a582c453$export$7371e516c83e77f1.indexOf(this.color);
        return c << 4 | t;
    }
}




export {$411c2a56a582c453$export$28c6a4757357ecf as cardType, $411c2a56a582c453$export$7371e516c83e77f1 as cardColor, $411c2a56a582c453$export$60332b2344f7fe41 as Card};
//# sourceMappingURL=index.mjs.map
