export class StringableGuard {

  constructor() { }

  static as(value: unknown): string {
    return String(value)
  }

  as(value: unknown): string {
    return String(value)
  }

}

export class StringGuard {

  constructor() { }

  static as(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

  as(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

}

export class StringIncludingGuard {

  constructor(
    readonly value: string
  ) { }

  as(value: string): string {
    if (!value.includes(this.value))
      throw new Error()
    return value
  }

}

export class StringStartingWithGuard {

  constructor(
    readonly value: string
  ) { }

  as(value: string): string {
    if (!value.startsWith(this.value))
      throw new Error()
    return value
  }

}

export class StringEndingWithGuard {

  constructor(
    readonly value: string
  ) { }

  as(value: string): string {
    if (!value.endsWith(this.value))
      throw new Error()
    return value
  }

}

export class StringMatchingGuard {

  constructor(
    readonly value: RegExp
  ) { }

  as(value: string): string {
    if (this.value.test(value) === null)
      throw new Error()
    return value
  }

}

export class HexStringGuard {

  constructor() { }

  static as(value: string): string {
    if (!/^[0-9a-fA-F]+$/.test(value))
      throw new Error()
    return value
  }

  as(value: string): string {
    if (!/^[0-9a-fA-F]+$/.test(value))
      throw new Error()
    return value
  }

}

export class ZeroHexStringGuard {

  constructor() { }

  static as(value: string): `0x${string}` {
    if (!/^0x[0-9a-fA-F]+$/.test(value))
      throw new Error()
    return value as `0x${string}`
  }

  as(value: string): `0x${string}` {
    if (!/^0x[0-9a-fA-F]+$/.test(value))
      throw new Error()
    return value as `0x${string}`
  }

}