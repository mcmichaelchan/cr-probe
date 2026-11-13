const sessions = new Map();

export function saveSession(id, session) {
  sessions.set(id, { ...session, savedAt: Date.now() });
}

export function getSession(id) {
  return sessions.get(id) ?? null;
}

export function deleteSession(id) {
  sessions.delete(id);
}

export function allSessions() {
  return [...sessions.entries()];
}
