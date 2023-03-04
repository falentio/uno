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
    constructor(type, color){
        this.type = type;
        this.color = color;
    }
    static fromId(id) {
        const t = $c8f77d9e23a393a2$export$28c6a4757357ecf[id & 0xf];
        if (!t) throw new Error("invalid cardType");
        const c = $c8f77d9e23a393a2$export$7371e516c83e77f1[id >>> 4 & 0xf];
        if (!c) throw new Error("invalid cardColor");
        return new $c8f77d9e23a393a2$export$60332b2344f7fe41(t, c);
    }
    id() {
        const t = $c8f77d9e23a393a2$export$28c6a4757357ecf.indexOf(this.type);
        const c = $c8f77d9e23a393a2$export$7371e516c83e77f1.indexOf(this.color);
        return c << 4 | t;
    }
}


$parcel$exportWildcard(module.exports, $c8f77d9e23a393a2$exports);


//# sourceMappingURL=index.js.map
