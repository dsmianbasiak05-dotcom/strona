import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeContact, validateContact } from "./contact-validation.ts";

const valid = {
  name: "  Anna  ",
  email: "Anna@Example.PL ",
  phone: "",
  interest: "dobor-materialow",
  message: "Szukamy materiałów do łazienki.",
  consent: "on",
};

test("accepts a complete submission and normalises it", () => {
  const input = normalizeContact(valid);
  assert.deepEqual(validateContact(input), {});
  assert.equal(input.name, "Anna");
  assert.equal(input.email, "anna@example.pl");
  assert.equal(input.consent, true);
});

test("phone is optional but validated when present", () => {
  assert.equal(validateContact(normalizeContact({ ...valid, phone: "+48 600 000 000" })).phone, undefined);
  assert.ok(validateContact(normalizeContact({ ...valid, phone: "abc" })).phone);
});

test("reports every missing required field", () => {
  const errors = validateContact(normalizeContact({}));
  assert.deepEqual(Object.keys(errors).sort(), ["consent", "email", "interest", "message", "name"]);
});

test("rejects unknown interest values and malformed e-mails", () => {
  const errors = validateContact(normalizeContact({ ...valid, interest: "hack", email: "a@b" }));
  assert.ok(errors.interest);
  assert.ok(errors.email);
});

test("enforces message length limits", () => {
  assert.ok(validateContact(normalizeContact({ ...valid, message: "krótko" })).message);
  assert.ok(validateContact(normalizeContact({ ...valid, message: "x".repeat(3001) })).message);
});
