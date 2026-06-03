export class NumberableGuard {

  constructor() { }

  static as(value: unknown): number {
    return Number(value)
  }

  as(value: unknown): number {
    return Number(value)
  }

}

export class NumberGuard {

  constructor() { }

  static as(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

  as(value: unknown): number {
    if (typeof value !== "number")
      throw new Error()
    return value
  }

}

export class PositiveNumberGuard {

  static as(value: number): number {
    if (value <= 0)
      throw new Error()
    return value
  }

  as(value: number): number {
    if (value <= 0)
      throw new Error()
    return value
  }

}

export class NegativeNumberGuard {

  static as(value: number): number {
    if (value >= 0)
      throw new Error()
    return value
  }

  as(value: number): number {
    if (value >= 0)
      throw new Error()
    return value
  }

}

export class NonPositiveNumberGuard {

  static as(value: number): number {
    if (value > 0)
      throw new Error()
    return value
  }

  as(value: number): number {
    if (value > 0)
      throw new Error()
    return value
  }

}

export class NonNegativeNumberGuard {

  static as(value: number): number {
    if (value < 0)
      throw new Error()
    return value
  }

  as(value: number): number {
    if (value < 0)
      throw new Error()
    return value
  }

}

export class MinNumberGuard {

  constructor(
    readonly value: number
  ) { }

  as(value: number): number {
    if (value < this.value)
      throw new Error()
    return value
  }

}

export class MaxNumberGuard<N extends number> {

  constructor(
    readonly value: N
  ) { }

  as(value: number): number {
    if (value > this.value)
      throw new Error()
    return value
  }

}