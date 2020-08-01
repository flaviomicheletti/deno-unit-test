import { delay } from "https://deno.land/std/async/delay.ts";
import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertNotEquals,
  assertStringContains,
  assertArrayContains,
  assertMatch,
  assertThrows,
  assertThrowsAsync
} from "https://deno.land/std@0.63.0/testing/asserts.ts";

Deno.test("Hello Test", () => {
  assert("Hello");
});

// Simple name and function, compact form, but not configurable
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// Fully fledged test definition, longer form, but configurable (see below)
Deno.test({
  name: "hello world #2",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(1000);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }

});

Deno.test("Test Assert", () => {
  assert(1);
  assert("Hello");
  assert(true);
});

Deno.test("Test Assert Equals", () => {
  assertEquals(1, 1);
  assertEquals("Hello", "Hello");
  assertEquals(true, true);
  assertEquals(undefined, undefined);
  assertEquals(null, null);
  assertEquals(new Date(), new Date());
  assertEquals(new RegExp("abc"), new RegExp("abc"));

  class Foo { }
  const foo1 = new Foo();
  const foo2 = new Foo();

  assertEquals(foo1, foo2);
});

Deno.test("Test Assert Not Equals", () => {
  assertNotEquals(1, 2);
  assertNotEquals("Hello", "World");
  assertNotEquals(true, false);
  assertNotEquals(undefined, "");
  assertNotEquals(new Date(), Date.now());
  assertNotEquals(new RegExp("abc"), new RegExp("def"));
});

Deno.test("Test Assert Strict Equals", () => {
  assertStrictEquals(1, 1);
  assertStrictEquals("Hello", "Hello");
  assertStrictEquals(true, true);
  assertStrictEquals(undefined, undefined);
});

Deno.test("Test Assert String Contains", () => {
  assertStringContains("Hello World", "Hello");
});

Deno.test("Test Assert Array Contains", () => {
  assertArrayContains([1, 2, 3], [1]);
  assertArrayContains([1, 2, 3], [1, 2]);
  assertArrayContains(Array.from("Hello World"), Array.from("Hello"));
});

Deno.test("Test Assert Match", () => {
  assertMatch("abcdefghi", new RegExp("def"));

  const basicUrl = new RegExp("^https?://[a-z.]+.com$");
  assertMatch("https://www.google.com", basicUrl);
  assertMatch("http://facebook.com", basicUrl);
});

Deno.test("Test Assert Throws", () => {
  assertThrows(
    () => {
      throw new Error("Panic!");
    },
    Error,
    "Panic!",
  );
});

Deno.test("Test Assert Throws Async", () => {
  assertThrowsAsync(
    () => {
      return new Promise(() => {
        throw new Error("Panic! Threw Error");
      });
    },
    Error,
    "Panic! Threw Error",
  );

  assertThrowsAsync(
    () => {
      return Promise.reject(new Error("Panic! Reject Error"));
    },
    Error,
    "Panic! Reject Error",
  );
});

Deno.test("Test Assert Equal Fail Custom Message", () => {
  assertEquals(1, 1, "Values Don't Match!");
});