import { Nullable } from "@/libs/nullable/mod.ts";

export interface Guard<I = any, O = any> {
  as(value: I): O
}

export namespace Guard {

  export type Input<T> = T extends Guard<infer I, any> ? I : never

  export type Output<T> = T extends Guard<any, infer O> ? O : never

  export type AllInput<T> = { [K in keyof T]: Input<T[K]> }

  export type AllOutput<T> = { [K in keyof T]: Output<T[K]> }

}

export function as<T extends Guard<any, any>>(guard: T, value: Guard.Input<T>): Guard.Output<T> {
  return guard.as(value)
}

export function asOrNull<T extends Guard<any, any>>(guard: T, value: Guard.Input<T>): Nullable<Guard.Output<T>> {
  try {
    return guard.as(value)
  } catch {
    return null
  }
}

export function is<T extends Guard<any, any>>(guard: T, value: Guard.Input<T>): value is Guard.Input<T> & Guard.Output<T> {
  try {
    return guard.as(value) === value
  } catch {
    return false
  }
}