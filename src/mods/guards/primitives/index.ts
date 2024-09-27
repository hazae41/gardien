
export class BooleanGuard {

  constructor() { }

  static asOrThrow(value: unknown): boolean

  static asOrThrow(value: boolean): boolean

  static asOrThrow(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): boolean

  asOrThrow(value: boolean): boolean

  asOrThrow(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

}

export class TrueGuard {

  constructor() { }

  static asOrThrow(value: unknown): true

  static asOrThrow(value: true): true

  static asOrThrow(value: unknown): true {
    if (value !== true)
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): true

  asOrThrow(value: true): true

  asOrThrow(value: unknown): true {
    if (value !== true)
      throw new Error()
    return value
  }

}

export class FalseGuard {

  constructor() { }

  static asOrThrow(value: unknown): false

  static asOrThrow(value: false): false

  static asOrThrow(value: unknown): false {
    if (value !== false)
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): false

  asOrThrow(value: false): false

  asOrThrow(value: unknown): false {
    if (value !== false)
      throw new Error()
    return value
  }

}

export class NumberGuard {

  constructor() { }

  static asOrThrow(value: unknown): number

  static asOrThrow(value: number): number

  static asOrThrow(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): number

  asOrThrow(value: number): number

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

  static asOrThrow(value: unknown): bigint

  static asOrThrow(value: bigint): bigint

  static asOrThrow(value: unknown): bigint {
    if (typeof value !== "bigint")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): bigint

  asOrThrow(value: bigint): bigint

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

  static asOrThrow(value: unknown): object

  static asOrThrow(value: object): object

  static asOrThrow(value: unknown): object {
    if (typeof value !== "object")
      throw new Error()
    if (value === null)
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): object

  asOrThrow(value: object): object

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

  static asOrThrow(value: unknown): Function

  static asOrThrow(value: Function): Function

  static asOrThrow(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): Function

  asOrThrow(value: Function): Function

  asOrThrow(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

}

export class SymbolGuard {

  constructor() { }

  static asOrThrow(value: unknown): symbol

  static asOrThrow(value: symbol): symbol

  static asOrThrow(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): symbol

  asOrThrow(value: symbol): symbol

  asOrThrow(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

}