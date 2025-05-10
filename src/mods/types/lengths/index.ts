import { MaxNumber, MinNumber } from "../numbers/index.js"

export class LengthGuard<N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow(value: { length: number }): { length: N }

  asOrThrow(value: { length: N }): { length: N }

  asOrThrow(value: { length: number }): { length: N } {
    if (value.length !== this.length)
      throw new Error()
    return value as { length: N }
  }

}

export class MinLengthGuard<N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow(value: { length: number }): { length: MinNumber<N> } {
    if (value.length < this.length)
      throw new Error()
    return value as { length: MinNumber<N> }
  }

}

export class MaxLengthGuard<N extends number> {

  constructor(
    readonly length: N
  ) { }

  asOrThrow(value: { length: number }): { length: MaxNumber<N> } {
    if (value.length > this.length)
      throw new Error()
    return value as { length: MaxNumber<N> }
  }

}