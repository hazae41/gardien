import { Super } from "../../super"

export class NullGuard {

  constructor() { }

  static asOrThrow<X extends null>(value: X): X

  static asOrThrow<X>(value: Super<X, null>): null

  static asOrThrow(value: unknown): null {
    if (value !== null)
      throw new Error()
    return value
  }

  asOrThrow<X extends null>(value: X): X

  asOrThrow<X>(value: Super<X, null>): null

  asOrThrow(value: unknown): null {
    if (value !== null)
      throw new Error()
    return value
  }

}

export class UndefinedGuard {

  constructor() { }

  static asOrThrow<X extends undefined>(value: X): X

  static asOrThrow<X>(value: Super<X, undefined>): undefined

  static asOrThrow(value: unknown): undefined {
    if (value !== undefined)
      throw new Error()
    return value
  }

  asOrThrow<X extends undefined>(value: X): X

  asOrThrow<X>(value: Super<X, undefined>): undefined

  asOrThrow(value: unknown): undefined {
    if (value !== undefined)
      throw new Error()
    return value
  }

}

export class NonNullableGuard {

  constructor() { }

  static asOrThrow<X>(value: X): NonNullable<X> {
    if (value == null)
      throw new Error()
    return value
  }

  asOrThrow<X>(value: X): NonNullable<X> {
    if (value == null)
      throw new Error()
    return value
  }

}