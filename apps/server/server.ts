import { createServer } from "./src"

console.log("starting")
const { server } = createServer()
server.listen(8080, () => console.log("listening on 8080"))