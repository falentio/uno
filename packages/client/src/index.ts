import { io, Socket } from "socket.io-client"
import { Game, Card, GameState, Player, createGameState, State } from "@uno/core"

export const nameSeparator = "::id::"

export class GameController {
	state = createGameState()
	constructor(
		public socket: Socket,
		public id: string,
	) {}

	play(card: Card) {
		this.socket.emit("play", this.id, card);
	}

	end() {
		this.socket.emit("end", this.id);
	}
}

export class UnoClient {
	socket: Socket
	games = new Map<string, GameController>()
	#player: Player
	constructor(
		public address: string,
		public name: string,
	) {
		this.#player = new Player(this.name)
		this.name = this.name + nameSeparator + Math.random().toString(36).slice(2)
		this.socket = io(this.address, {
			query: {
				name: this.name,
			},
		});

		this.#init();
	}

	#init() {
		this.socket.on("leave", (gameId, name) => {
			if (name === this.name) {
				this.games.delete(gameId)
			}
		})

		this.socket.on("state", (gameId, k, v) => {
			const game = this.games.get(gameId);
			if (!game) {
				return;
			}
			(game.state as any)[k] = v;
		})
	}

	join(gameId: string): Promise<GameController> {
		this.socket.emit("join", gameId);
		return new Promise((resolve) => {
			this.socket.once("join", gameId => {
				const ctrl = new GameController(this.socket, gameId)
				this.games.set(gameId, ctrl)
				resolve(ctrl)
			})
		})
	}
}