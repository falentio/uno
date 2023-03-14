export interface Listener<T = unknown> {
	(data: T): void
}

export interface ListenerAny<T = unknown, U = unknown> {
	(event: T, data: U): void
}

export class Emitter<T extends {}> {
	#listeners = new Map<keyof T, Listener[]>()
	#any = [] as ListenerAny<keyof T, T[keyof T]>[]

	on<K extends keyof T>(name: K, l: Listener<T[K]>) {
		const ls = this.#listeners.get(name) || []
		if (ls.length === 0) {
			this.#listeners.set(name, ls)
		}
		ls.push(l as Listener)

		return () => {
			const idx = ls.findIndex(f => f === l)
			if (idx < 0) {
				return
			}
			ls.splice(idx, 1)
		}
	}

	once<K extends keyof T>(name: K, l: Listener<T[K]>) {
		let unsub = () => {}
		const fn: Listener<T[K]> = (data) => {
			l(data)
			unsub()
		}
		unsub = this.on(name, fn)
	}

	onAsync<K extends keyof T>(name: K) {
		return new Promise<T[K]>(resolve => {
			this.once(name, resolve)
		})
	}

	async* onAsyncIterable<K extends keyof T>(name: K) {
		while (true) {
			yield await this.onAsync(name)
		}
	}

	onAny<K extends keyof T>(l: ListenerAny<K, T[K]>) {
		this.#any.push(l as ListenerAny<keyof T, T[keyof T]>)
		return () => {
			const idx = this.#any.findIndex(f => f === l)
			if (idx < 0) {
				return
			}
			this.#any.splice(idx, 1)
		}
	}

	onceAny<K extends keyof T>(l: ListenerAny<K, T[K]>) {
		let unsub = () => {}
		const fn: ListenerAny<K, T[K]> = (key, data) => {
			l(key, data)
			unsub()
		}
		unsub = this.onAny(fn)
	}

	onAnyAsync() {
		return new Promise<[keyof T, T[keyof T]]>(resolve => {
			this.onceAny((event, data) => resolve([event, data]))
		})
	}

	async* onAnyAsyncIterable() {
		while (true) {
			yield await this.onAnyAsync()
		}
	}

	emit<K extends keyof T>(event: K, data: T[K]) {
		const ls: Listener<T[K]>[] = this.#listeners.get(event) || []
		for (const l of ls) {
			l(data)
		}
		for (const l of this.#any) {
			l(event, data)
		}
	}
}