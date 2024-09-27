
export class NullGuard {

  constructor() { }

  static asOrThrow(value: unknown): null

  static asOrThrow(value: null): null

  static asOrThrow(value: unknown): null {
    if (value !== null)
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): null

  asOrThrow(value: null): null

  asOrThrow(value: unknown): null {
    if (value !== null)
      throw new Error()
    return value
  }

}

export class UndefinedGuard {

  constructor() { }

  static asOrThrow(value: unknown): undefined

  static asOrThrow(value: undefined): undefined

  static asOrThrow(value: unknown): undefined {
    if (value !== undefined)
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): undefined

  asOrThrow(value: undefined): undefined

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