import { assert, test } from "@hazae41/phobos";
import { Guard } from "./guard/index.js";
import { z } from "./index.js";
import { record, string } from "./toolbox/index.js";

await test("record string min", async () => {
  const result = Guard.is(record({
    aaa: string().min(6)
  } as const), {
    aaa: "aaa"
  } as const)

  assert(result === false)
})

await test("unknown rpc", async () => {
  const RpcRequestGuard = z.record({
    jsonrpc: z.strong("2.0"),
    id: z.union([z.strong(null), z.number(), z.string()]),
    method: z.string(),
    params: z.omitable(z.unknown())
  } as const)

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  Guard.asOrThrow(RpcRequestGuard, JSON.parse(raw) as unknown)
})

await test("known rpc", async () => {
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  const RpcRequestGuard = <M extends Guard<string, string>, P extends Guard>(method: M, params: P) => z.record({
    jsonrpc: z.strong("2.0"),
    id: z.union([z.strong(null), z.number(), z.string()]),
    method: method,
    params: params
  } as const)

  const ExampleParamsGuard = z.record({
    example: z.string()
  } as const)

  Guard.asOrThrow(RpcRequestGuard(z.strong("example"), ExampleParamsGuard), JSON.parse(raw) as unknown)
})

await test("numberable", async () => {
  assert(Guard.is(z.numberable().nonNegative(), "123") === true)
  assert(Guard.is(z.numberable().nonNegative(), "0x123") === true)
})