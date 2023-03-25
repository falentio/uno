import { io, Socket } from "socket.io-client"
import { Game } from "@uno/core"

export async function connect(hostname: string, name: string) {
	const game = new Game();
	const socket = io(hostname, {
		query: {
			name,
		},
	});
	return game
}

export class UnoClient {
	socket: Socket
	games = new Map<string, Game>()
	constructor(
		public address: string,
		public name: string
	) {
		this.socket = io(this.hostname, {
			query: {
				name: this.name,
			},
		});

		this.#init();
	}

	#init() {
		socket.on("join", gameId => {
			const game = new Game()
			this.games.set(gameId, game)
		})
	}

	join(gameId: string) {}
}