import { Card, Game, Player, UnoError } from "@uno/core";
import express from "express";
import * as http from "http";
import { Server, Socket } from "socket.io";

function setupGame(game: Game, io: Server) {
	game.on("stateChange", ([k, v]) => {
		io.to(game.id).emit(`game:${game.id}:state`, k, v);
	});
}

function handleError(socket: Socket, e: unknown) {
	console.error(e);
	if (e instanceof UnoError) {
		socket.emit("error", e.message);
		return;
	}
	console.error(e);
	socket.emit("error", (e as Error).message || e);
}

export function createServer() {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server);
	const players = new Set<string>();
	let games = [] as Game[];

	io.on("connection", socket => {
		const url = new URL(socket.request.url || "", "https://uno/");
		const name = url.searchParams.get("name");
		if (!name) {
			socket.emit("error", "name not provided");
			return;
		}

		socket.on("create", () => {
			try {
				const player = new Player(name);
				const game = new Game(player);
				setupGame(game, io);
				games.push(game);
				socket.join(game.id);
				io.to(game.id).emit(`game:${game.id}:join`, game.id);
				socket.emit("created", game.id);
			} catch (e) {
				handleError(socket, e);
			}
		});

		socket.on("join", id => {
			try {
				const game = games.find(g => g.id === id);
				if (!game) {
					socket.emit("error", "game not found");
					return;
				}
				game.join(name);
				socket.join(game.id);
				io.to(game.id).emit(`game:${game.id}:join`, game.id);
				game.state.each((k, v) => {
					socket.emit(`game:${game.id}:state`, k, v);
				});
			} catch (e) {
				handleError(socket, e);
			}
		});

		socket.on("start", id => {
			try {
				const game = games.find(g => g.id === id);
				if (!game) {
					socket.emit("error", "game not found");
					return;
				}
				game.start();
				io.to(game.id).emit(`game:${game.id}:start`, game.id);
			} catch (e) {
				handleError(socket, e);
			}
		});

		socket.on("play", (id, card) => {
			try {
				const game = games.find(g => g.id === id);
				if (!game) {
					socket.emit("error", "game not found");
					return;
				}
				if (!game.hasPlayer(name)) {
					socket.emit("error", "not participate this game");
				}
				if (game.currentPlayer().name !== name) {
					socket.emit("error", "not your turn");
				}
				game.play(card);
			} catch (e) {
				handleError(socket, e);
			}
		});

		socket.on("leave", id => {
			try {
				const game = games.find(g => g.id === id);
				if (!game) {
					socket.emit("error", "game not found");
					return;
				}
				game.leave(name);
				io.to(game.id).emit(`game:${game.id}:leave`, game.id);
			} catch (e) {
				handleError(socket, e);
			}
		});
	});

	app.get("/health", (req, res) => {
		res.status(200).end();
	});

	app.get("/game/list", (req, res) => {
		res.json(games);
	});

	return {
		app,
		server,
		io,
		games: () => games,
		players: () => players,
	};
}
