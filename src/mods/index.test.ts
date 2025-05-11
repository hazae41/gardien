import { assert, test } from "@hazae41/phobos";
import { asOrThrow, Guard, is } from "./guard/index.js";
import { $inter, $length, $number, $numberable, $omitable, $record, $string, $strong, $union, $unknown } from "./guards/index.js";

await test("record string min", async () => {
  const result = is($record({
    aaa: $inter([$string(), $length.min(6)])
  } as const), {
    aaa: "aaa"
  } as const)

  assert(result === false)
})

await test("unknown rpc", async () => {
  const RpcRequestGuard = $record({
    jsonrpc: $strong("2.0"),
    id: $union([$strong(null), $number(), $string()]),
    method: $string(),
    params: $omitable($unknown())
  } as const)

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  asOrThrow(RpcRequestGuard, JSON.parse(raw) as unknown)
})

await test("known rpc", async () => {
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  const RpcRequestGuard = <M extends Guard<string, string>, P extends Guard>(method: M, params: P) => $record({
    jsonrpc: $strong("2.0"),
    id: $union([$strong(null), $number(), $string()]),
    method: method,
    params: params
  } as const)

  const ExampleParamsGuard = $record({
    example: $string()
  } as const)

  asOrThrow(RpcRequestGuard($strong("example"), ExampleParamsGuard), JSON.parse(raw) as unknown)
})

await test("numberable", async () => {
  assert(is($inter([$numberable(), $number.nonNegative()]), "123") === true)
  assert(is($inter([$numberable(), $number.nonNegative()]), "0x123") === true)
})