export class LengthGuard {

  constructor(
    readonly length: number
  ) { }

  asOrThrow(value: { length: number }): { length: number } {
    if (value.length !== this.length)
      throw new Error()
    return value
  }

}

export class MinLengthGuard {

  constructor(
    readonly length: number
  ) { }

  asOrThrow(value: { length: number }): { length: number } {
    if (value.length < this.length)
      throw new Error()
    return value
  }

}

export class MaxLengthGuard {

  constructor(
    readonly length: number
  ) { }

  asOrThrow(value: { length: number }): { length: number } {
    if (value.length > this.length)
      throw new Error()
    return value
  }

}