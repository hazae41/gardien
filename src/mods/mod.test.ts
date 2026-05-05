import { assert, test } from "@hazae41/phobos";
import { $either, $length, $number, $object, $pass, $record, $string, $strong, asOrThrow, Guard, is } from "./mod.ts";

test("record string min", async () => {
  const result = is($record({
    aaa: $string().then($length.min(4))
  } as const), {
    aaa: "aaa"
  } as const)

  assert(result === false)
})

test("unknown rpc", async () => {
  const RpcRequestGuard = $object().then($record({
    jsonrpc: $strong("2.0"),
    id: $either([$strong(null), $number(), $string()]),
    method: $string(),
    params: $pass()
  } as const))

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  asOrThrow(RpcRequestGuard, JSON.parse(raw) as unknown)
})

test("known rpc", async () => {
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "example",
    params: { example: "example" }
  } as const)

  const RpcRequestGuard = <M extends Guard<unknown, string>, P extends Guard<unknown, unknown>>(method: M, params: P) => $object().then($record({
    jsonrpc: $strong("2.0"),
    id: $either([$strong(null), $number(), $string()]),
    method: method,
    params: params
  } as const))

  const ExampleParamsGuard = $object().then($record({
    example: $string()
  } as const))

  asOrThrow(RpcRequestGuard($strong("example"), ExampleParamsGuard), JSON.parse(raw) as unknown)
})

test("numberable", async () => {
  assert(is($number().then($number.nonNegative()), 123) === true)
  assert(is($number().then($number.nonNegative()), -123) === false)
})