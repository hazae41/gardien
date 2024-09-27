import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { LengthGuard, MaxLengthGuard, Min, MinLengthGuard } from "mods/guards/lengths/index.js"
import { InterGuard } from "mods/guards/logicals/index.js"
import { Override, Super } from "mods/super/index.js"

export function string(message?: string) {
  return new StringGuardBuilder(new Errorer(StringGuard, () => new Error(message)))
}

export function stringable(message?: string) {
  return new StringGuardBuilder(new Errorer(StringableGuard, () => new Error(message)))
}

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

export class StringGuardBuilder<T extends Guard.Overloaded<unknown, unknown, string>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow<X extends Guard.Overloaded.Strong<T>>(value: X): X

  asOrThrow<X extends Guard.Overloaded.Weak<T>>(value: Super<X, Override<X, Required<Guard.Overloaded.Strong<T>>>>): Guard.Overloaded.Output<T>

  asOrThrow(this: StringGuardBuilder<T>, value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    return this.guard.asOrThrow(value)
  }

  pipe<P extends string, U extends Guard<Guard.Overloaded.Output<T>, P>>(guard: U, message?: string) {
    return new StringGuardBuilder<Guard.Overloaded<Guard.Overloaded.Weak<T>, Guard.Overloaded.Strong<U>, Guard.Overloaded.Output<U>>>(new Errorer(new InterGuard(this.guard, guard), () => new Error(message)))
  }

  min<N extends number>(length: N, message?: string) {
    return this.pipe(new MinLengthGuard<Guard.Overloaded.Output<T>, N>(length), message)
  }

  max<N extends number>(length: N, message?: string) {
    return this.pipe(new MaxLengthGuard<Guard.Overloaded.Output<T>, N>(length), message)
  }

  minmax<A extends number, B extends number>(min: A, max: B, message?: string) {
    return this.pipe(new InterGuard(new MinLengthGuard<Guard.Overloaded.Output<T>, A>(min), new MaxLengthGuard<Guard.Overloaded.Output<T> & { length: Min<A> }, B>(max)), message)
  }

  length<N extends number>(length: N, message?: string) {
    return this.pipe(new LengthGuard<Guard.Overloaded.Output<T>, N>(length), message)
  }

  includes<S extends string>(value: S, message?: string) {
    return this.pipe(new StringIncludesGuard<Guard.Overloaded.Output<T>, S>(value), message)
  }

}

declare const StringIncludesSymbol: unique symbol

export interface StringIncludes<S extends string> {
  readonly [StringIncludesSymbol]: S
}

export class StringIncludesGuard<T extends string, S extends string> {

  constructor(
    readonly value: S
  ) { }

  asOrThrow(value: T): T & StringIncludes<S> {
    if (!value.includes(this.value))
      throw new Error()
    return value as T & StringIncludes<S>
  }

}