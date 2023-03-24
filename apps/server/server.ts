import { handler } from "@uno/web";
import { createServer } from "./src";

console.log("starting");
const { server, app } = createServer();
app.use(handler);
server.listen(8080, () => console.log("listening on 8080"));
