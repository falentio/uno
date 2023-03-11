import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { Game, Player } from "@uno/core"

export function createServer() {
	const app = express()
	const server = http.createServer(app)
	const io = new Server(server)
	const players = new Set<string>()
	let games = [] as Game[]

	io.on("connection", socket => {
		const url = new URL(socket.request.url || "", "https://uno/")
		const name = url.searchParams.get("name") + "::" + performance.now().toString(36)
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
		players,
		games,
	}
}
