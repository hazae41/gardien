import { Exact } from "libs/exact/index.js"
import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { Property } from "mods/props/index.js"
import { ArrayAndElementsGuard, ArrayAndTupleGuard, AsGuard, BigIntableGuard, BigIntGuard, BooleanGuard, FailGuard, FunctionGuard, InterGuard, LengthGuard, MaxLengthGuard, MinLengthGuard, ObjectGuard, PassGuard, RecordGuard, StrongEqualityGuard, SymbolGuard, UnionGuard, WeakEqualityGuard } from "mods/types/index.js"
import { MaxNumberGuard, MinNumberGuard, NegativeNumberGuard, NonNegativeNumberGuard, NonPositiveNumberGuard, NumberableGuard, NumberGuard, PositiveNumberGuard } from "mods/types/numbers/index.js"
import { StringableGuard, StringEndingWithGuard, StringGuard, StringIncludingGuard, StringMatchingGuard, StringStartingWithGuard } from "mods/types/strings/index.js"

export function $error<T extends Guard<any, any>>(guard: T, message?: string) {
  return new Errorer(guard, (cause) => new Error(message, { cause }))
}

/**
 * Mark a property as readonly
 * @example { test: readonly(string()) }: { readonly test: string }
 * @example PASS: { test: "hello" }
 * @example FAIL: { test: 1 }
 * @param value 
 * @returns 
 */
export function $readonly<T>(value: T) {
  return new Property.Readonly(value)
}

/**
 * Mark a property as optional and allow undefined values
 * @example { test: optional(string()) }: { test?: string() }
 * @example PASS: { test: "hello" }
 * @example PASS: { test: undefined }
 * @example PASS: {}
 * @example FAIL: { test: 1 }
 * @param value 
 * @returns 
 */
export function $optional<T>(value: T) {
  return new Property.Optional(value)
}

/**
 * Like optional but the output type is an union with undefined instead of an optional
 * @example { test: omitable(string()) }: { test: string() | undefined }
 * @example PASS: { test: "hello" }
 * @example PASS: { test: undefined }
 * @example PASS: {}
 * @example FAIL: { test: 1 }
 * @param value 
 * @returns 
 */
export function $omitable<T>(value: T) {
  return new Property.Omitable(value)
}

export function $any() {
  return new PassGuard<any>()
}

export function $unknown() {
  return new PassGuard<unknown>()
}

export function $as<T>() {
  return new AsGuard<T>()
}

export function $pass<T>() {
  return new PassGuard<T>()
}

export function $fail<T>(message?: string) {
  return $error(new FailGuard<T>(), message)
}

export function $never(message?: string) {
  return $error(new FailGuard<never>(), message)
}

export function $strong<T>(value: Exact<T>, message?: string) {
  return $error(new StrongEqualityGuard(value), message)
}

export function $weak<T>(value: Exact<T>, message?: string) {
  return $error(new WeakEqualityGuard(value), message)
}

export function $boolean(message?: string) {
  return $error(BooleanGuard, message)
}

export function $string(message?: string) {
  return $error(StringGuard, message)
}

export namespace $string {

  export function $includes<S extends string>(value: S, message?: string) {
    return $error(new StringIncludingGuard<S>(value), message)
  }

  export function $startsWith<S extends string>(value: S, message?: string) {
    return $error(new StringStartingWithGuard<S>(value), message)
  }

  export function $endsWith<S extends string>(value: S, message?: string) {
    return $error(new StringEndingWithGuard<S>(value), message)
  }

  export function $matches<X extends RegExp>(value: X, message?: string) {
    return $error(new StringMatchingGuard<X>(value), message)
  }

}

export function $stringable(message?: string) {
  return $error(StringableGuard, message)
}

export function $number(message?: string) {
  return $error(NumberGuard, message)
}

export function $numberable(message?: string) {
  return $error(NumberableGuard, message)
}

export namespace $number {

  export function $positive(message?: string) {
    return $error(PositiveNumberGuard, message)
  }

  export function $negative(message?: string) {
    return $error(NegativeNumberGuard, message)
  }

  export function $nonPositive(message?: string) {
    return $error(NonPositiveNumberGuard, message)
  }

  export function $nonNegative(message?: string) {
    return $error(NonNegativeNumberGuard, message)
  }

  export function $min<N extends number>(value: N, message?: string) {
    return $error(new MinNumberGuard<N>(value), message)
  }

  export function $max<N extends number>(value: N, message?: string) {
    return $error(new MaxNumberGuard<N>(value), message)
  }

  export function $minmax<A extends number, B extends number>(min: A, max: B, message?: string) {
    return $inter([new MinNumberGuard<A>(min), new MaxNumberGuard<B>(max)] as const, message)
  }

}

export function $bigint(message?: string) {
  return $error(BigIntGuard, message)
}

export function $bigintable(message?: string) {
  return $error(BigIntableGuard, message)
}

export function $object(message?: string) {
  return $error(ObjectGuard, message)
}

export function $callable(message?: string) {
  return $error(FunctionGuard, message)
}

export function $symbol(message?: string) {
  return $error(SymbolGuard, message)
}

export function $array<T extends Guard<any, any>>(value: T, message?: string) {
  return $error(new ArrayAndElementsGuard(value), message)
}

export function $tuple<T extends [Guard<any, any>, ...Guard<any, any>[]]>(value: T, message?: string) {
  return $error(new ArrayAndTupleGuard(value), message)
}

export function $record<T extends { [k: PropertyKey]: Property<Guard<any, any>> }>(value: T, message?: string) {
  return $error(new RecordGuard(value), message)
}

export function $inter<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]>(guards: T, message?: string) {
  return $error(new InterGuard(guards), message)
}

export function $union<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]>(guards: T, message?: string) {
  return $error(new UnionGuard(guards), message)
}

export function $length<N extends number>(length: N, message?: string) {
  return $error(new LengthGuard<N>(length), message)
}

export namespace $length {

  export function $min<N extends number>(length: N, message?: string) {
    return $error(new MinLengthGuard<N>(length), message)
  }

  export function $max<N extends number>(length: N, message?: string) {
    return $error(new MaxLengthGuard<N>(length), message)
  }

  export function $minmax<A extends number, B extends number>(min: A, max: B, message?: string) {
    return $inter([new MinLengthGuard<A>(min), new MaxLengthGuard<B>(max)] as const, message)
  }

}