
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

declare const PositiveNumberSymbol: unique symbol

export type PositiveNumber = number & { readonly [PositiveNumberSymbol]: true }

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

declare const NegativeNumberSymbol: unique symbol

export type NegativeNumber = number & { readonly [NegativeNumberSymbol]: true }

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

declare const NonPositiveNumberSymbol: unique symbol

export type NonPositiveNumber = number & { readonly [NonPositiveNumberSymbol]: true }

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

declare const NonNegativeNumberSymbol: unique symbol

export type NonNegativeNumber = number & { readonly [NonNegativeNumberSymbol]: true }

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

declare const MinSymbol: unique symbol

export type Min<X> = symbol & { readonly [MinSymbol]: X }

export type MinNumber<N extends number> = number & { readonly [k in Min<N>]: true }

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

declare const MaxSymbol: unique symbol

export type Max<X> = symbol & { readonly [MaxSymbol]: X }

export type MaxNumber<N extends number> = number & { readonly [k in Max<N>]: true }

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