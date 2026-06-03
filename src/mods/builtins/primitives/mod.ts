export class BooleanGuard {

  constructor() { }

  static as(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

  as(value: unknown): boolean {
    if (typeof value !== "boolean")
      throw new Error()
    return value
  }

}

export class BigIntGuard {

  constructor() { }

  static as(value: unknown): bigint {
    if (typeof value !== "bigint")
      throw new Error()
    return value
  }

  as(value: unknown): bigint {
    if (typeof value !== "bigint")
      throw new Error()
    return value
  }

}

export class BigIntableGuard {

  constructor() { }

  static as(value: string | number | bigint | boolean): bigint {
    return BigInt(value)
  }

  as(value: string | number | bigint | boolean): bigint {
    return BigInt(value)
  }

}

export class ObjectGuard {

  constructor() { }

  static as(value: unknown): object {
    if (typeof value !== "object")
      throw new Error()
    if (value === null)
      throw new Error()
    return value
  }

  as(value: unknown): object {
    if (typeof value !== "object")
      throw new Error()
    if (value === null)
      throw new Error()
    return value
  }

}

export class FunctionGuard {

  constructor() { }

  static as(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

  as(value: unknown): Function {
    if (typeof value !== "function")
      throw new Error()
    return value
  }

}

export class SymbolGuard {

  constructor() { }

  static as(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

  as(value: unknown): symbol {
    if (typeof value !== "symbol")
      throw new Error()
    return value
  }

}