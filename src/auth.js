import { getSession } from "./store.js";

export function requireSession(req) {
  const id = req.headers["x-session-id"];
  const session = getSession(id);
  if (!session) throw new Error("unauthorized");
  return session;
}
