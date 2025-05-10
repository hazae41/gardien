import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { LengthGuard, MaxLengthGuard, MinLengthGuard } from "mods/types/lengths/index.js"
import { InterGuard } from "mods/types/logicals/index.js"

export class StringableGuard {

  constructor() { }

  static asOrThrow(value?: any): string {
    return String(value)
  }

  asOrThrow(value?: any): string {
    return String(value)
  }

}

export class StringGuard {

  constructor() { }

  static asOrThrow(value: unknown): string

  static asOrThrow(value: string): string

  static asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): string

  asOrThrow(value: string): string

  asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

}

export class StringGuardBuilder<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Strong<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    return this.guard.asOrThrow(value)
  }

  inter<U extends Guard<any, any>>(guard: U, message?: string) {
    return new StringGuardBuilder(new Errorer(new InterGuard([this.guard, guard] as const), (cause) => new Error(message, { cause })))
  }

  min<N extends number>(length: N, message?: string) {
    return this.inter(new MinLengthGuard<N>(length), message)
  }

  max<N extends number>(length: N, message?: string) {
    return this.inter(new MaxLengthGuard<N>(length), message)
  }

  minmax<A extends number, B extends number>(min: A, max: B, message?: string) {
    return this.inter(new InterGuard([new MinLengthGuard<A>(min), new MaxLengthGuard<B>(max)] as const), message)
  }

  length<N extends number>(length: N, message?: string) {
    return this.inter(new LengthGuard<N>(length), message)
  }

  includes<S extends string>(value: S, message?: string) {
    return this.inter(new StringIncludingGuard<S>(value), message)
  }

  startsWith<S extends string>(value: S, message?: string) {
    return this.inter(new StringStartingWithGuard<S>(value), message)
  }

  endsWith<S extends string>(value: S, message?: string) {
    return this.inter(new StringEndingWithGuard<S>(value), message)
  }

  matches<X extends RegExp>(value: X, message?: string) {
    return this.inter(new StringMatchingGuard<X>(value), message)
  }

}

declare const IncludingSymbol: unique symbol

export type Including<X> = symbol & { [IncludingSymbol]: X }

export type StringIncluding<S extends string> = string & { [k in Including<S>]: true }

export class StringIncludingGuard<S extends string> {

  constructor(
    readonly value: S
  ) { }

  asOrThrow(value: string): StringIncluding<S> {
    if (!value.includes(this.value))
      throw new Error()
    return value as StringIncluding<S>
  }

}

declare const StartingWithSymbol: unique symbol

export type StartingWith<X> = symbol & { [StartingWithSymbol]: X }

export type StringStartingWith<S extends string> = string & { [k in StartingWith<S>]: true }

export class StringStartingWithGuard<S extends string> {

  constructor(
    readonly value: S
  ) { }

  asOrThrow(value: string): StringStartingWith<S> {
    if (!value.startsWith(this.value))
      throw new Error()
    return value as StringStartingWith<S>
  }

}

declare const EndingWithSymbol: unique symbol

export type EndingWith<X> = symbol & { [EndingWithSymbol]: X }

export type StringEndingWith<S extends string> = string & { [k in EndingWith<S>]: true }

export class StringEndingWithGuard<S extends string> {

  constructor(
    readonly value: S
  ) { }

  asOrThrow(value: string): StringEndingWith<S> {
    if (!value.endsWith(this.value))
      throw new Error()
    return value as StringEndingWith<S>
  }

}

declare const MatchingSymbol: unique symbol

export type Matching<X> = symbol & { [MatchingSymbol]: X }

export type StringMatching<S extends RegExp> = string & { [k in Matching<S>]: true }

export class StringMatchingGuard<X extends RegExp> {

  constructor(
    readonly value: X
  ) { }

  asOrThrow(value: string): StringMatching<X> {
    if (this.value.test(value) === null)
      throw new Error()
    return value as StringMatching<X>
  }

}