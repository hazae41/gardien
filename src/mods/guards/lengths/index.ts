export class LengthGuard<T extends { length: number }, N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow(value: T): T & { length: N }

  asOrThrow(value: T & { length: N }): T & { length: N }

  asOrThrow(value: T): T & { length: N } {
    if (value.length !== this.length)
      throw new Error()
    return value as T & { length: N }
  }

}

declare const MinSymbol: unique symbol

export interface Min<N extends number> {
  readonly [MinSymbol]: N
}

export class MinLengthGuard<T extends { length: number }, N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow(value: T): T & { length: Min<N> }

  asOrThrow(value: T & { length: Min<N> }): T & { length: Min<N> }

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

  asOrThrow(value: T): T & { length: Max<N> }

  asOrThrow(value: T & { length: Max<N> }): T & { length: Max<N> }

  asOrThrow(value: T): T & { length: Max<N> } {
    if (value.length > this.length)
      throw new Error()
    return value as T & { length: Max<N> }
  }

}