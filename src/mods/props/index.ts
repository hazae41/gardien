import { Finalize } from "libs/finalize/index.js"

export type Property<T> =
  | T
  | Property.Optional<T>
  | Property.Readonly<T>

export namespace Property {

  export class Optional<T> {
    readonly #class = Optional

    constructor(
      readonly value: T
    ) { }
  }

  export namespace Optional {

    export type As<T, K extends keyof T> = T[K] extends Optional<unknown> ? K : never
    export type AsNot<T, K extends keyof T> = T[K] extends Optional<unknown> ? never : K

    export type Of<T> = T extends Optional<infer U> ? U : never
    export type OfNot<T> = T extends Optional<unknown> ? never : T

    export type AllUnwrapped<T> = Finalize<{ [K in keyof T as As<T, K>]?: Of<T[K]> } & { [K in keyof T as AsNot<T, K>]-?: OfNot<T[K]> }>

  }

  export class Readonly<T> {
    readonly #class = Readonly

    constructor(
      readonly value: T
    ) { }
  }

  export namespace Readonly {

    export type As<T, K extends keyof T> = T[K] extends Readonly<unknown> ? K : never
    export type AsNot<T, K extends keyof T> = T[K] extends Readonly<unknown> ? never : K

    export type Of<T> = T extends Readonly<infer U> ? U : never
    export type OfNot<T> = T extends Readonly<unknown> ? never : T

    export type AllUnwrapped<T> = Finalize<{ readonly [K in keyof T as As<T, K>]: Of<T[K]> } & { -readonly [K in keyof T as AsNot<T, K>]: OfNot<T[K]> }>

  }

  export type AllUnwrapped<T> = Readonly.AllUnwrapped<Optional.AllUnwrapped<T>>
}