import { Emitter } from "@uno/emitter";

export type StateEvents = {
	change: [k: string, v: unknown];
};

export type State<T> = T & Emitter<StateEvents> & StateMethod<T>;
export type StateMethod<T = {}> = {
	reset(): void;
	change(k: Extract<keyof T, string>): void;
};

export function state<T extends Record<string, unknown>>(v: T): State<T> {
	const s = Object.assign({}, v) as T;
	const e = new Emitter<StateEvents>();
	const method = {
		reset() {
			for (const k of Object.keys(v)) {
				s[k as keyof typeof s] = v[k] as any;
			}
		},
		change(k: Extract<keyof T, string>) {
			e.emit("change", [k, s[k]]);
		},
		each(fn: (k: string, v: unknown) => void) {
			for (const [k, v] of Object.entries(s)) {
				fn(k, v)
			}
		},
	};
	return new Proxy(s, {
		get(target, key, receivver) {
			if (key in s) {
				return s[key as keyof typeof s];
			}
			if (key in e) {
				return e[key as keyof typeof e].bind(e);
			}
			if (key in method) {
				return method[key as keyof typeof method];
			}
		},
		set(target, key, value, receivver) {
			s[key as keyof typeof s] = value;
			method.change(key as any);
			return true;
		},
	}) as State<T>;
}
