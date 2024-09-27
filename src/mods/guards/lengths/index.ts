import { Override, Super } from "mods/super/index.js"

export class LengthGuard<T extends { length: number }, N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow<X extends T & { length: N }>(value: X): X

  // @ts-ignore
  asOrThrow<X extends T>(value: Super<X, Override<X, T & { length: N }>>): Override<X, T & { length: N }>

  asOrThrow(value: T): T & { length: N } {
    if (value.length !== this.length)
      throw new Error()
    return value as T & { length: N }
  }

}

new LengthGuard(1).asOrThrow([null] as const)

declare const MinSymbol: unique symbol

export interface Min<N extends number> {
  readonly [MinSymbol]: N
}

export class MinLengthGuard<T extends { length: number }, N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow<X extends T & { length: Min<N> }>(value: X): X

  asOrThrow<X extends T>(value: Super<X, Override<X, T & { length: Min<N> }>>): Override<X, T & { length: Min<N> }>

  asOrThrow(value: T): T & { length: Min<N> } {
    if (value.length < this.length)
      throw new Error()
    return value as T & { length: Min<N> }
  }

}

declare const MaxSymbol: unique symbol

export interface Max<N extends number> {
  readonly [MaxSymbol]: N
}

export class MaxLengthGuard<T extends { length: number }, N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow<X extends T & { length: Max<N> }>(value: X): X

  asOrThrow<X extends T>(value: Super<X, Override<X, T & { length: Max<N> }>>): Override<X, T & { length: Max<N> }>

  asOrThrow(value: T): T & { length: Max<N> } {
    if (value.length > this.length)
      throw new Error()
    return value as T & { length: Max<N> }
  }

}