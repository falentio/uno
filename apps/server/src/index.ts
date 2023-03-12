import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { Game, Player, Card } from "@uno/core"

function setupGame(game: Game, io: Server) {
	game.on("stateChange", ([k, v]) => {
		io.to(game.id).emit(`game:${game.id}:state`, k, v)
	})
}

export function createServer() {
	const app = express()
	const server = http.createServer(app)
	const io = new Server(server)
	const players = new Set<string>()
	let games = [] as Game[]

	io.on("connection", socket => {
		const url = new URL(socket.request.url || "", "https://uno/")
		const name = url.searchParams.get("name") + "::" + (performance.now() * 0xff | 0).toString(36)

		socket.on("disconnect", () => {
			players.remove(name)
			for (const g of games) {
				g.leave(name)
			}
		})

		socket.on("create", () => {
			const player = new Player(name)
			const game = new Game(player)
			setupGame(game, io)
			games.push(game)
			socket.join(game.id)
			io.to(game.id).emit(`game:${game.id}:join`, game.id)
			socket.emit("created", game.id)
		})

		socket.on("join", id => {
			const game = games.find(g => g.id === id)
			game.join(name)
			socket.join(game.id)
			io.to(game.id).emit(`game:${game.id}:join`, game.id)
		})

		socket.on("start", id => {
			const game = games.find(g => g.id === id)
			game.start()
			io.to(game.id).emit(`game:${game.id}:start`, game.id)
		})

		socket.on("play", (id, card) => {
			const game = games.find(g => g.id === id)
			if (!game.hasPlayer(name)) {
				socket.emit("error", "not participate this game")
			}
			if (game.currentPlayer().name !== name) {
				socket.emit("error", "not your turn")
			}
			game.play(card)
		})

		socket.on("leave", id => {
			const game = games.find(g => g.id === id)
			game.leave(name)
			io.to(game.id).emit(`game:${game.id}:leave`, game.id)
		})
	})

	// wss.on("connection", (ws, req) => {
	// 	const url = new URL(req.url, "https://uno/")
	// 	const name = url.searchParams.get("name") + "::" + performance.now().toString(36)
	// 	players.add(name)
	// 	ws.on("message", data => {
	// 		try {
	// 			const { event, game, data } = JSON.parse(data)
	// 			switch (event) {
	// 				case "join": {
	// 					const g = games.find(g => g.id === "game")
	// 					g.join()
	// 				}
	// 			}
	// 		} catch (e) {
	// 			console.error(e)
	// 		}
	// 	})
	// 	ws.on("close", () => {
	// 		players.remove(name)
	// 		for (const g of games) {
	// 			g.leave(name)
	// 		}
	// 	})
	// })

	return {
		app,
		server,
		io,
		games: () => games,
		players: () => players,
	}
}
