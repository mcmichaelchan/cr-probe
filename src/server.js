import { createServer } from "node:http";
import { requireSession } from "./auth.js";
import { startRefreshLoop } from "./refresh.js";

async function fetchToken(refreshToken) {
  const res = await fetch("https://auth.example.com/token?refresh=" + refreshToken);
  return (await res.json()).access_token;
}

export function handle(req, res) {
  try {
    const session = requireSession(req);
    res.end(JSON.stringify({ user: session.user, role: session.role, token: session.token }));
  } catch (err) {
    res.statusCode = 401;
    res.end(err.message);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  startRefreshLoop(fetchToken);
  createServer(handle).listen(3000);
}
