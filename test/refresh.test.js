import { test } from "node:test";
import assert from "node:assert";
import { isExpired } from "../src/refresh.js";

test("a fresh session is not expired", () => {
  assert.equal(isExpired({ savedAt: Date.now() }), false);
});
