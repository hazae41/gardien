import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
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

export class NumberGuardBuilder<T extends Guard.Overloaded<unknown, unknown, number>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Strong<T>): Guard.Overloaded.Output<T>

  asOrThrow(this: NumberGuardBuilder<Guard.Overloaded.Infer<T>>, value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    return this.guard.asOrThrow(value)
  }

  pipe<U extends Guard<Guard.Overloaded.Output<T>, number>>(guard: U, message?: string) {
    return new NumberGuardBuilder(new Errorer(new InterGuard([this.guard, guard] as const), (cause) => new Error(message, { cause })))
  }

  positive(message?: string) {
    return this.pipe(new PositiveNumberGuard<Guard.Overloaded.Output<T>>(), message)
  }

  negative(message?: string) {
    return this.pipe(new NegativeNumberGuard<Guard.Overloaded.Output<T>>(), message)
  }

  nonPositive(message?: string) {
    return this.pipe(new NonPositiveNumberGuard<Guard.Overloaded.Output<T>>(), message)
  }

  nonNegative(message?: string) {
    return this.pipe(new NonNegativeNumberGuard<Guard.Overloaded.Output<T>>(), message)
  }

}

declare const PositiveNumberSymbol: unique symbol

export interface PositiveNumber {
  readonly [PositiveNumberSymbol]: true
}

export class PositiveNumberGuard<T extends number> {

  static asOrThrow<T extends number>(value: T): T & PositiveNumber {
    if (value <= 0)
      throw new Error()
    return value as T & PositiveNumber
  }

  asOrThrow(value: T): T & PositiveNumber {
    if (value <= 0)
      throw new Error()
    return value as T & PositiveNumber
  }

}

declare const NegativeNumberSymbol: unique symbol

export interface NegativeNumber {
  readonly [NegativeNumberSymbol]: true
}

export class NegativeNumberGuard<T extends number> {

  static asOrThrow<T extends number>(value: T): T & NegativeNumber {
    if (value >= 0)
      throw new Error()
    return value as T & NegativeNumber
  }

  asOrThrow(value: T): T & NegativeNumber {
    if (value >= 0)
      throw new Error()
    return value as T & NegativeNumber
  }

}

declare const NonPositiveNumberSymbol: unique symbol

export interface NonPositiveNumber {
  readonly [NonPositiveNumberSymbol]: true
}

export class NonPositiveNumberGuard<T extends number> {

  static asOrThrow<T extends number>(value: T): T & NonPositiveNumber {
    if (value > 0)
      throw new Error()
    return value as T & NonPositiveNumber
  }

  asOrThrow(value: T): T & NonPositiveNumber {
    if (value > 0)
      throw new Error()
    return value as T & NonPositiveNumber
  }

}

declare const NonNegativeNumberSymbol: unique symbol

export interface NonNegativeNumber {
  readonly [NonNegativeNumberSymbol]: true
}

export class NonNegativeNumberGuard<T extends number> {

  static asOrThrow<T extends number>(value: T): T & NonNegativeNumber {
    if (value < 0)
      throw new Error()
    return value as T & NonNegativeNumber
  }

  asOrThrow(value: T): T & NonNegativeNumber {
    if (value < 0)
      throw new Error()
    return value as T & NonNegativeNumber
  }

}