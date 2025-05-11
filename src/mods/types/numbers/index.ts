
export class NumberableGuard {

  constructor() { }

  static asOrThrow(value?: any): number {
    return Number(value)
  }

  asOrThrow(value?: any): number {
    return Number(value)
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

export type PositiveNumberSymbol = symbol & { readonly name: "PositiveNumberSymbol" }

export type PositiveNumber = number & { readonly [k: PositiveNumberSymbol]: true }

export class PositiveNumberGuard {

  static asOrThrow(value: number): PositiveNumber {
    if (value <= 0)
      throw new Error()
    return value as PositiveNumber
  }

  asOrThrow(value: number): PositiveNumber {
    if (value <= 0)
      throw new Error()
    return value as PositiveNumber
  }

}

export type NegativeNumberSymbol = symbol & { readonly name: "NegativeNumberSymbol" }

export type NegativeNumber = number & { readonly [k: NegativeNumberSymbol]: true }

export class NegativeNumberGuard {

  static asOrThrow(value: number): NegativeNumber {
    if (value >= 0)
      throw new Error()
    return value as NegativeNumber
  }

  asOrThrow(value: number): NegativeNumber {
    if (value >= 0)
      throw new Error()
    return value as NegativeNumber
  }

}

export type NonPositiveNumberSymbol = symbol & { readonly name: "NonPositiveNumberSymbol" }

export type NonPositiveNumber = number & { readonly [k: NonPositiveNumberSymbol]: true }

export class NonPositiveNumberGuard {

  static asOrThrow(value: number): NonPositiveNumber {
    if (value > 0)
      throw new Error()
    return value as NonPositiveNumber
  }

  asOrThrow(value: number): NonPositiveNumber {
    if (value > 0)
      throw new Error()
    return value as NonPositiveNumber
  }

}

export type NonNegativeNumberSymbol = symbol & { readonly name: "NonNegativeNumberSymbol" }

export type NonNegativeNumber = number & { readonly [k: NonNegativeNumberSymbol]: true }

export class NonNegativeNumberGuard {

  static asOrThrow(value: number): NonNegativeNumber {
    if (value < 0)
      throw new Error()
    return value as NonNegativeNumber
  }

  asOrThrow(value: number): NonNegativeNumber {
    if (value < 0)
      throw new Error()
    return value as NonNegativeNumber
  }

}

export type MinSymbol = symbol & { readonly name: "MinSymbol" }

export type MinSymbol2<X> = symbol & { readonly [k: MinSymbol]: X }

export type MinNumber<N extends number> = number & { readonly [k: MinSymbol2<N>]: true }

export class MinNumberGuard<N extends number> {

  constructor(
    readonly value: N
  ) { }

  asOrThrow(value: number): MinNumber<N> {
    if (value < this.value)
      throw new Error()
    return value as MinNumber<N>
  }

}

export type MaxSymbol = symbol & { readonly name: "MaxSymbol" }

export type MaxSymbol2<X> = symbol & { readonly [k: MaxSymbol]: X }

export type MaxNumber<N extends number> = number & { readonly [k: MaxSymbol2<N>]: true }

export class MaxNumberGuard<N extends number> {

  constructor(
    readonly value: N
  ) { }

  asOrThrow(value: number): MaxNumber<N> {
    if (value > this.value)
      throw new Error()
    return value as MaxNumber<N>
  }

}