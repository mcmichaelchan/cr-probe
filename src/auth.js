import { getSession } from "./store.js";
import { isExpired } from "./refresh.js";

export function requireSession(req) {
  const id = req.headers["x-session-id"];
  const session = getSession(id);
  if (!session) throw new Error("unauthorized");
  if (isExpired(session)) throw new Error("expired");
  return session;
}
