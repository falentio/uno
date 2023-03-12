export class Emitter<T = {}> {
	#listeners: Record<string, Array<(v: unknown) => void>> = {};

	on<K extends keyof T, L extends (v: T[K]) => void>(k: K, l: L) {
		const ls = this.#listeners[k as string] ??= [];
		ls.push(l as (v: unknown) => void);
		return () => {
			this.#listeners[k as string] = this.#listeners[k as string].filter(
				fn => fn !== l,
			);
		};
	}

	emit<K extends keyof T>(k: K, v: T[K]) {
		const ls = this.#listeners[k as string] ??= [];
		ls.forEach(f => f(v));
	}
}
