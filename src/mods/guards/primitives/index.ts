import { Super } from "mods/super/index.js"

export class BooleanGuard {

  constructor() { }

  static asOrThrow<X extends boolean>(value: X): X

  static asOrThrow<X>(value: Super<X, boolean>): boolean

  static asOrThrow(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

  asOrThrow<X extends boolean>(value: X): X

  asOrThrow<X>(value: Super<X, boolean>): boolean

  asOrThrow(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

}

export class TrueGuard {

  constructor() { }

  static asOrThrow<X extends true>(value: X): X

  static asOrThrow<X>(value: Super<X, true>): true

  static asOrThrow(value: unknown): true {
    if (value !== true)
      throw new Error()
    return value
  }

  asOrThrow<X extends true>(value: X): X

  asOrThrow<X>(value: Super<X, true>): true

  asOrThrow(value: unknown): true {
    if (value !== true)
      throw new Error()
    return value
  }

}

export class FalseGuard {

  constructor() { }

  static asOrThrow<X extends false>(value: X): X

  static asOrThrow<X>(value: Super<X, false>): false

  static asOrThrow(value: unknown): false {
    if (value !== false)
      throw new Error()
    return value
  }

  asOrThrow<X extends false>(value: X): X

  asOrThrow<X>(value: Super<X, false>): false

  asOrThrow(value: unknown): false {
    if (value !== false)
      throw new Error()
    return value
  }

}

export class NumberGuard {

  constructor() { }

  static asOrThrow<X extends number>(value: X): X

  static asOrThrow<X>(value: Super<X, number>): number

  static asOrThrow(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

  asOrThrow<X extends number>(value: X): X

  asOrThrow<X>(value: Super<X, number>): number

  asOrThrow(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

}

export class NumberableGuard {

  constructor() { }

  static asOrThrow(value?: any): number {
    return Number(value)
  }

  asOrThrow(value?: any): number {
    return Number(value)
  }

}

export class BigIntGuard {

  constructor() { }

  static asOrThrow<X extends bigint>(value: X): X

  static asOrThrow<X>(value: Super<X, bigint>): bigint

  static asOrThrow(value: unknown): bigint {
    if (typeof value !== "bigint")
      throw new Error()
    return value
  }

  asOrThrow<X extends bigint>(value: X): X

  asOrThrow<X>(value: Super<X, bigint>): bigint

  asOrThrow(value: unknown): bigint {
    if (typeof value !== "bigint")
      throw new Error()
    return value
  }

}

export class BigIntableGuard {

  constructor() { }

  static asOrThrow(value: string | number | bigint | boolean): bigint {
    return BigInt(value)
  }

  asOrThrow(value: string | number | bigint | boolean): bigint {
    return BigInt(value)
  }

}

export class ObjectGuard {

  constructor() { }

  static asOrThrow<X extends object>(value: X): X

  static asOrThrow<X>(value: Super<X, object>): object

  static asOrThrow(value: unknown): object {
    if (typeof value !== "object")
      throw new Error()
    if (value === null)
      throw new Error()
    return value
  }

  asOrThrow<X extends object>(value: X): X

  asOrThrow<X>(value: Super<X, object>): object

  asOrThrow(value: unknown): object {
    if (typeof value !== "object")
      throw new Error()
    if (value === null)
      throw new Error()
    return value
  }

}

export class FunctionGuard {

  constructor() { }

  static asOrThrow<X extends Function>(value: X): X

  static asOrThrow<X>(value: Super<X, Function>): Function

  static asOrThrow(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

  asOrThrow<X extends Function>(value: X): X

  asOrThrow<X>(value: Super<X, Function>): Function

  asOrThrow(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

}

export class SymbolGuard {

  constructor() { }

  static asOrThrow<X extends symbol>(value: X): X

  static asOrThrow<X>(value: Super<X, symbol>): symbol

  static asOrThrow(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

  asOrThrow<X extends symbol>(value: X): X

  asOrThrow<X>(value: Super<X, symbol>): symbol

  asOrThrow(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

}