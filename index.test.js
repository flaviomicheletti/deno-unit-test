import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(1000);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});