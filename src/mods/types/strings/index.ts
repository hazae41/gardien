
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

declare const IncludingSymbol: unique symbol

export type Including<X> = symbol & { readonly [IncludingSymbol]: X }

export type StringIncluding<S extends string> = string & { readonly [k in Including<S>]: true }

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

export type StartingWith<X> = symbol & { readonly [StartingWithSymbol]: X }

export type StringStartingWith<S extends string> = string & { readonly [k in StartingWith<S>]: true }

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

export type EndingWith<X> = symbol & { readonly [EndingWithSymbol]: X }

export type StringEndingWith<S extends string> = string & { readonly [k in EndingWith<S>]: true }

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

export type Matching<X> = symbol & { readonly [MatchingSymbol]: X }

export type StringMatching<S extends RegExp> = string & { readonly [k in Matching<S>]: true }

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