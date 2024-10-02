import { Restruct } from "libs/restruct/index.js"
import { IsSame } from "libs/same/index.js"
import { Resup } from "libs/supinf/index.js"

export interface Guard<I, O> {
  asOrThrow(value: I): O
}

export namespace Guard {

  export interface Overloaded<W, S extends W, O> {
    asOrThrow(value: W): O
    asOrThrow(value: S): O
  }

  export namespace Overloaded {
    export type Infer<T> = Overloaded<Weak<T>, Strong<T>, Output<T>>

    export type Weak<T> = T extends Overloaded<infer W, any, any> ? W : never

    export type Strong<T> = T extends Overloaded<any, infer S, any> ? S : never

    export type Output<T> = T extends Overloaded<any, any, infer O> ? O : never

    export type WeakOrSelf<T> = T extends Overloaded<infer W, any, any> ? W : T

    export type StrongOrSelf<T> = T extends Overloaded<any, infer S, any> ? S : T

    export type OutputOrSelf<T> = T extends Overloaded<any, any, infer O> ? O : T

    export type AllInfer<T> = { [K in keyof T]: Infer<T[K]> }

    export type AllStrong<T> = { [K in keyof T]: Strong<T[K]> }

    export type AllWeak<T> = { [K in keyof T]: Weak<T[K]> }

    export type AllOutput<T> = { [K in keyof T]: Output<T[K]> }

    export type AllWeakOrSelf<T> = { [K in keyof T]: WeakOrSelf<T[K]> }

    export type AllStrongOrSelf<T> = { [K in keyof T]: StrongOrSelf<T[K]> }

    export type AllOutputOrSelf<T> = { [K in keyof T]: OutputOrSelf<T[K]> }

    export type Guardable<X extends Guard.Overloaded.Weak<T>, T extends Guard.Overloaded<any, any, any>> = Guard.Overloaded.Strong<T> | Resup<X, Restruct<X, Guard.Overloaded.Strong<T>>>

    export type Guarded<X extends Guard.Overloaded.Weak<T>, T extends Guard.Overloaded<any, any, any>> = IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X & Restruct<X, Guard.Overloaded.Output<T>> : Guard.Overloaded.Output<T>

  }

  export function asOrThrow<T extends Guard.Overloaded<any, any, any>, X extends Guard.Overloaded.Weak<T>>(guard: T, value: Guard.Overloaded.Guardable<X, T>): Guard.Overloaded.Guarded<X, T> {
    return guard.asOrThrow(value)
  }

  export function asOrNull<T extends Guard.Overloaded<any, any, any>, X extends Guard.Overloaded.Weak<T>>(guard: T, value: Guard.Overloaded.Guardable<X, T>): Guard.Overloaded.Guarded<X, T> | null {
    try {
      return guard.asOrThrow(value)
    } catch {
      return null
    }
  }

  export function is<T extends Guard.Overloaded<any, any, any>, X extends Guard.Overloaded.Weak<T>>(guard: T, value: Guard.Overloaded.Guardable<X, T>): value is Guard.Overloaded.Guarded<X, T> {
    try {
      guard.asOrThrow(value)

      return true
    } catch {
      return false
    }
  }

}