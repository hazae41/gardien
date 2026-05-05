export class NumberableGuard {

  constructor() { }

  static asOrThrow(value: unknown): number {
    return Number(value)
  }

  asOrThrow(value: unknown): number {
    return Number(value)
  }

}

export class NumberGuard {

  constructor() { }

  static asOrThrow(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

}

export class PositiveNumberGuard {

  static asOrThrow(value: number): number {
    if (value <= 0)
      throw new Error()
    return value
  }

  asOrThrow(value: number): number {
    if (value <= 0)
      throw new Error()
    return value
  }

}

export class NegativeNumberGuard {

  static asOrThrow(value: number): number {
    if (value >= 0)
      throw new Error()
    return value
  }

  asOrThrow(value: number): number {
    if (value >= 0)
      throw new Error()
    return value
  }

}

export class NonPositiveNumberGuard {

  static asOrThrow(value: number): number {
    if (value > 0)
      throw new Error()
    return value
  }

  asOrThrow(value: number): number {
    if (value > 0)
      throw new Error()
    return value
  }

}

export class NonNegativeNumberGuard {

  static asOrThrow(value: number): number {
    if (value < 0)
      throw new Error()
    return value
  }

  asOrThrow(value: number): number {
    if (value < 0)
      throw new Error()
    return value
  }

}

export class MinNumberGuard {

  constructor(
    readonly value: number
  ) { }

  asOrThrow(value: number): number {
    if (value < this.value)
      throw new Error()
    return value
  }

}

export class MaxNumberGuard<N extends number> {

  constructor(
    readonly value: N
  ) { }

  asOrThrow(value: number): number {
    if (value > this.value)
      throw new Error()
    return value
  }

}