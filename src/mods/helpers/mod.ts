import { Guard } from "@/mods/guard/mod.ts"
import { FailGuard, PassGuard } from "@/mods/types/abstracts/mod.ts"
import { ArrayGuard, ElementsGuard, TupleGuard } from "@/mods/types/arrays/mod.ts"
import { StrongGuard, WeakGuard } from "@/mods/types/equalities/mod.ts"
import { LengthGuard, MaxLengthGuard, MinLengthGuard } from "@/mods/types/lengths/mod.ts"
import { EitherGuard, ThenGuard } from "@/mods/types/logicals/index.ts"
import { MaxNumberGuard, MinNumberGuard, NegativeNumberGuard, NonNegativeNumberGuard, NonPositiveNumberGuard, NumberableGuard, NumberGuard, PositiveNumberGuard } from "@/mods/types/numbers/index.ts"
import { BigIntableGuard, BigIntGuard, BooleanGuard, FunctionGuard, ObjectGuard, SymbolGuard } from "@/mods/types/primitives/index.ts"
import { RecordGuard } from "@/mods/types/records/index.ts"
import { StringableGuard, StringEndingWithGuard, StringGuard, StringIncludingGuard, StringMatchingGuard, StringStartingWithGuard } from "@/mods/types/strings/index.ts"
import { Errorer } from "@/mods/wrappers/mod.ts"

export function $error<T extends Guard<any, any>>(guard: T, message?: string) {
  return new Errorer(guard, (cause) => new Error(message, { cause }))
}

export function $nullable<T extends Guard<any, any>>(value: T) {
  return $either([value, $weak(null)])
}

export function $omitable<T extends Guard<any, any>>(value: T) {
  return $either([value, $strong(undefined)])
}

export function $fail(message?: string) {
  return $error(FailGuard, message)
}

export function $pass<T = unknown>() {
  return new PassGuard<T>()
}

export function $strong<T = unknown>(value: T, message?: string) {
  return $error(new StrongGuard(value), message)
}

export function $weak<T = unknown>(value: T, message?: string) {
  return $error(new WeakGuard(value), message)
}

export function $boolean(message?: string) {
  return $error(BooleanGuard, message)
}

export function $string(message?: string) {
  return $error(StringGuard, message)
}

export namespace $string {

  export function includes(value: string, message?: string) {
    return $error(new StringIncludingGuard(value), message)
  }

  export function startsWith(value: string, message?: string) {
    return $error(new StringStartingWithGuard(value), message)
  }

  export function endsWith(value: string, message?: string) {
    return $error(new StringEndingWithGuard(value), message)
  }

  export function matches(value: RegExp, message?: string) {
    return $error(new StringMatchingGuard(value), message)
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

  export function positive(message?: string) {
    return $error(PositiveNumberGuard, message)
  }

  export function negative(message?: string) {
    return $error(NegativeNumberGuard, message)
  }

  export function nonPositive(message?: string) {
    return $error(NonPositiveNumberGuard, message)
  }

  export function nonNegative(message?: string) {
    return $error(NonNegativeNumberGuard, message)
  }

  export function min(value: number, message?: string) {
    return $error(new MinNumberGuard(value), message)
  }

  export function max(value: number, message?: string) {
    return $error(new MaxNumberGuard(value), message)
  }

  export function minmax(min: number, max: number, message?: string) {
    return $error(new ThenGuard(new MinNumberGuard(min), new MaxNumberGuard(max)), message)
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
  return $error(new ThenGuard(ArrayGuard, new ElementsGuard(value)), message)
}

export function $tuple<T extends [Guard<any, any>, ...Guard<any, any>[]]>(value: T, message?: string) {
  return $error(new ThenGuard(ArrayGuard, new TupleGuard(value)), message)
}

export function $record<T extends { [k: PropertyKey]: Guard<any, any> }>(value: T, message?: string) {
  return $error(new RecordGuard(value), message)
}

export function $either<T extends readonly Guard<any, any>[]>(guards: T, message?: string) {
  return $error(new EitherGuard(guards), message)
}

export function $length(length: number, message?: string) {
  return $error(new LengthGuard(length), message)
}

export namespace $length {

  export function min(length: number, message?: string) {
    return $error(new MinLengthGuard(length), message)
  }

  export function max(length: number, message?: string) {
    return $error(new MaxLengthGuard(length), message)
  }

  export function minmax(min: number, max: number, message?: string) {
    return $error(new ThenGuard(new MinLengthGuard(min), new MaxLengthGuard(max)), message)
  }

}