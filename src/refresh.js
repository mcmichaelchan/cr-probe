import { allSessions, saveSession, deleteSession } from "./store.js";

const TTL_MS = 15 * 60 * 1000;
let timer;

export function isExpired(session, now = Date.now()) {
  return now - session.savedAt > TTL_MS;
}

// Refresh sessions that are close to expiry, drop expired ones.
export async function refreshAll(fetchToken) {
  for (const [id, session] of allSessions()) {
    if (isExpired(session)) {
      deleteSession(id);
      continue;
    }
    if (Date.now() - session.savedAt > TTL_MS - 60_000) {
      const token = await fetchToken(session.refreshToken);
      saveSession(id, { ...session, token });
    }
  }
}

export function startRefreshLoop(fetchToken) {
  timer = setInterval(() => refreshAll(fetchToken), 30_000);
}

export function stopRefreshLoop() {
  clearInterval(timer);
}
