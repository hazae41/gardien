
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

export type IncludingSymbol = symbol & { readonly name: "IncludingSymbol" }

export type IncludingSymbol2<X> = symbol & { readonly [k: IncludingSymbol]: X }

export type StringIncluding<S extends string> = string & { readonly [k: IncludingSymbol2<S>]: true }

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

export type StartingWithSymbol = symbol & { readonly name: "StartingWithSymbol" }

export type StartingWithSymbol2<X> = symbol & { readonly [k: StartingWithSymbol]: X }

export type StringStartingWith<S extends string> = string & { readonly [k: StartingWithSymbol2<S>]: true }

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

export type EndingWithSymbol = symbol & { readonly name: "EndingWithSymbol" }

export type EndingWithSymbol2<X> = symbol & { readonly [k: EndingWithSymbol]: X }

export type StringEndingWith<S extends string> = string & { readonly [k: EndingWithSymbol2<S>]: true }

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

export type MatchingSymbol = symbol & { readonly name: "MatchingSymbol" }

export type MatchingSymbol2<X> = symbol & { readonly [k: MatchingSymbol]: X }

export type StringMatching<S extends RegExp> = string & { readonly [k: MatchingSymbol2<S>]: true }

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