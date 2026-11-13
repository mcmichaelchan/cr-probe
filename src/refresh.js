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
      try {
        const token = await fetchToken(session.refreshToken);
        if (token) saveSession(id, { ...session, token });
      } catch (err) {
        console.error("refresh failed", id, err);
      }
    }
  }
}

export function startRefreshLoop(fetchToken) {
  timer = setInterval(() => refreshAll(fetchToken).catch(console.error), 30_000);
}

export function stopRefreshLoop() {
  clearInterval(timer);
}
