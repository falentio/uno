import * as express from "express"
import * as http from "http"
import * as ws from "ws"

export function createServer() {
	const app = express()
	const server = http.createServer(app)
	const wss = new ws.WebSocket({ server })

	return {
		app,
		server,
		wss,
	}
}
