export class StringableGuard {

  constructor() { }

  static asOrThrow(value: unknown): string {
    return String(value)
  }

  asOrThrow(value: unknown): string {
    return String(value)
  }

}

export class StringGuard {

  constructor() { }

  static asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

}

export class StringIncludingGuard {

  constructor(
    readonly value: string
  ) { }

  asOrThrow(value: string): string {
    if (!value.includes(this.value))
      throw new Error()
    return value
  }

}

export class StringStartingWithGuard {

  constructor(
    readonly value: string
  ) { }

  asOrThrow(value: string): string {
    if (!value.startsWith(this.value))
      throw new Error()
    return value
  }

}

export class StringEndingWithGuard {

  constructor(
    readonly value: string
  ) { }

  asOrThrow(value: string): string {
    if (!value.endsWith(this.value))
      throw new Error()
    return value
  }

}

export class StringMatchingGuard {

  constructor(
    readonly value: RegExp
  ) { }

  asOrThrow(value: string): string {
    if (this.value.test(value) === null)
      throw new Error()
    return value
  }

}