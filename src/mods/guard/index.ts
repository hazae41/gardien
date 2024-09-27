import { IsSame } from "mods/same/index.js"
import { Override, Resolve, Super } from "mods/super/index.js"

export interface Guard<I, O> {
  asOrThrow(value: I): O
}

export namespace Guard {

  export interface Overloaded<W, S extends W, O> {
    asOrThrow(value: S): O
    asOrThrow(value: W): O
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

  }

  export type Infer<T> = Guard<Guard.Input<T>, Guard.Output<T>>

  export type Input<T> = T extends Guard<infer X, any> ? X : never

  export type InputOrSelf<T> = T extends Guard<infer X, any> ? X : T

  export type Output<T> = T extends Guard<any, infer X> ? X : never

  export type OutputOrSelf<T> = T extends Guard<any, infer X> ? X : T

  export type AllInfer<T> = { [K in keyof T]: Infer<T[K]> }

  export type AllInput<T> = { [K in keyof T]: Input<T[K]> }

  export type AllInputOrSelf<T> = { [K in keyof T]: InputOrSelf<T[K]> }

  export type AllOutput<T> = { [K in keyof T]: Output<T[K]> }

  export type AllOutputOrSelf<T> = { [K in keyof T]: OutputOrSelf<T[K]> }

  export function asOrNull<T extends Guard.Overloaded<any, any, any>, X extends Guard.Overloaded.Strong<T>>(guard: T, value: Resolve<X>): (IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X : Guard.Overloaded.Output<T>) | null;

  export function asOrNull<T extends Guard.Overloaded<any, any, any>, X extends Guard.Overloaded.Weak<T>>(guard: T, value: Super<Resolve<X>, Override<X, Required<Guard.Overloaded.Strong<T>>>>): (IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? Override<X, Guard.Overloaded.Output<T>> : Guard.Overloaded.Output<T>) | null;

  export function asOrNull<T extends Guard.Overloaded<any, any, any>>(guard: T, value: Guard.Input<T>): Guard.Output<T> | null {
    try {
      return guard.asOrThrow(value)
    } catch {
      return null
    }
  }

  // export function is<T extends Guard<unknown, unknown>, X>(guard: T, value: Coerced.Input<T["asOrThrow"], X, Guard.Input<T>, Guard.Output<T>>): value is Coerced.Input<T["asOrThrow"], X, Guard.Input<T>, Guard.Output<T>> & Guard.Output<T> {
  //   try {
  //     guard.asOrThrow(value as Guard.Input<T>)

  //     return true
  //   } catch {
  //     return false
  //   }
  // }

}