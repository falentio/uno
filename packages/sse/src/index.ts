import { Game } from "@uno/core"

function sendEvent(controller: ReadableStreamDefaultController,name: string, data: unknown) {
	let msg = ""
	msg += `event: ${name}\n`
	msg += `data: ${JSON.stringify(data)}\n\n`
	return controller.enqueue(msg)
}

export function emmitter(g: Game, controller: ReadableStreamDefaultController) {
	let close = false
	g.onAny(async (k, arg) => {
		await sendEvent(controller, k, {
			id: g.id,
			arg,
		})
	})
}