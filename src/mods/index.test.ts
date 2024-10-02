import { assert, test } from "@hazae41/phobos";
import { Guard } from "./guard/index.js";
import { record, string } from "./toolbox/index.js";

await test("record string min", async () => {
  const result = Guard.is(record({
    aaa: string().min(6)
  } as const), {
    aaa: "aaa"
  } as const)

  assert(result === false)
})