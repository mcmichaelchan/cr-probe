import { createServer } from "node:http";
import { requireSession } from "./auth.js";

export function handle(req, res) {
  try {
    const session = requireSession(req);
    res.end(JSON.stringify({ user: session.user }));
  } catch {
    res.statusCode = 401;
    res.end("unauthorized");
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  createServer(handle).listen(3000);
}
