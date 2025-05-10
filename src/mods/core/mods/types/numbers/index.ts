import { Errorer } from "mods/core/mods/errorer/index.js"
import { Guard } from "mods/core/mods/guard/index.js"
import { InterGuard } from "../logicals/index.js"

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

export class NumberGuardBuilder<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Strong<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    return this.guard.asOrThrow(value)
  }

  inter<U extends Guard<any, any>>(guard: U, message?: string) {
    return new NumberGuardBuilder(new Errorer(new InterGuard([this.guard, guard] as const), (cause) => new Error(message, { cause })))
  }

  positive(message?: string) {
    return this.inter(PositiveNumberGuard, message)
  }

  negative(message?: string) {
    return this.inter(NegativeNumberGuard, message)
  }

  nonPositive(message?: string) {
    return this.inter(NonPositiveNumberGuard, message)
  }

  nonNegative(message?: string) {
    return this.inter(NonNegativeNumberGuard, message)
  }

  min<N extends number>(value: N, message?: string) {
    return this.inter(new MinNumberGuard<N>(value), message)
  }

  max<N extends number>(value: N, message?: string) {
    return this.inter(new MaxNumberGuard<N>(value), message)
  }

  minmax<A extends number, B extends number>(min: A, max: B, message?: string) {
    return this.inter(new InterGuard([new MinNumberGuard<A>(min), new MaxNumberGuard<B>(max)] as const), message)
  }

}

declare const PositiveNumberSymbol: unique symbol

export type PositiveNumber = number & { [PositiveNumberSymbol]: true }

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

export type NegativeNumber = number & { [NegativeNumberSymbol]: true }

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

export type NonPositiveNumber = number & { [NonPositiveNumberSymbol]: true }

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

export type NonNegativeNumber = number & { [NonNegativeNumberSymbol]: true }

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

export type Min<X> = symbol & { [MinSymbol]: X }

export type MinNumber<N extends number> = number & { [k in Min<N>]: true }

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

export type Max<X> = symbol & { [MaxSymbol]: X }

export type MaxNumber<N extends number> = number & { [k in Max<N>]: true }

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