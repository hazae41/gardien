import { Exact } from "libs/exact/index.js"
import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { ArrayAndElementsGuard, ArrayAndTupleGuard, AssertGuard, BigIntableGuard, BigIntGuard, BooleanGuard, FailGuard, FunctionGuard, InterGuard, NumberableGuard, NumberGuard, ObjectGuard, PassGuard, RecordGuard, StrongEqualityGuard, SymbolGuard, UnionGuard, WeakEqualityGuard } from "mods/guards/index.js"
import { StringableGuard, StringGuard, StringGuardBuilder } from "mods/guards/strings/index.js"
import { Property } from "mods/props/index.js"

export function optional<T>(value: T) {
  return new Property.Optional(value)
}

export function readonly<T>(value: T) {
  return new Property.Readonly(value)
}

export function any() {
  return new PassGuard<any>()
}

export function unknown() {
  return new PassGuard<unknown>()
}

export function pass<T>() {
  return new PassGuard<T>()
}

export function fail<T>(message?: string) {
  return new Errorer(new FailGuard<T>(), (cause) => new Error(message, { cause }))
}

export function assert<T>() {
  return new AssertGuard<T>()
}

export function never(message?: string) {
  return new Errorer(new FailGuard<never>(), (cause) => new Error(message, { cause }))
}

export function strong<T>(value: Exact<T>, message?: string) {
  return new Errorer(new StrongEqualityGuard(value), (cause) => new Error(message, { cause }))
}

export function weak<T>(value: Exact<T>, message?: string) {
  return new Errorer(new WeakEqualityGuard(value), (cause) => new Error(message, { cause }))
}

export function boolean(message?: string) {
  return new Errorer(BooleanGuard, (cause) => new Error(message, { cause }))
}

export function string(message?: string) {
  return new StringGuardBuilder(new Errorer(StringGuard, (cause) => new Error(message, { cause })))
}

export function stringable(message?: string) {
  return new StringGuardBuilder(new Errorer(StringableGuard, (cause) => new Error(message, { cause })))
}

export function number(message?: string) {
  return new Errorer(NumberGuard, (cause) => new Error(message, { cause }))
}

export function numberable(message?: string) {
  return new Errorer(NumberableGuard, (cause) => new Error(message, { cause }))
}

export function bigint(message?: string) {
  return new Errorer(BigIntGuard, (cause) => new Error(message, { cause }))
}

export function bigintable(message?: string) {
  return new Errorer(BigIntableGuard, (cause) => new Error(message, { cause }))
}

export function object(message?: string) {
  return new Errorer(ObjectGuard, (cause) => new Error(message, { cause }))
}

export function callable(message?: string) {
  return new Errorer(FunctionGuard, (cause) => new Error(message, { cause }))
}

export function symbol(message?: string) {
  return new Errorer(SymbolGuard, (cause) => new Error(message, { cause }))
}

export function array<T extends Guard<any, any>>(value: T, message?: string) {
  return new Errorer(new ArrayAndElementsGuard(value), (cause) => new Error(message, { cause }))
}

export function tuple<T extends [Guard<any, any>, ...Guard<any, any>[]]>(value: T, message?: string) {
  return new Errorer(new ArrayAndTupleGuard(value), (cause) => new Error(message, { cause }))
}

export function record<T extends { [k: PropertyKey]: Property<Guard<any, any>> }>(value: T, message?: string) {
  return new Errorer(new RecordGuard(value), (cause) => new Error(message, { cause }))
}

export function inter<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]>(guards: T, message?: string) {
  return new Errorer(new InterGuard(guards), (cause) => new Error(message, { cause }))
}

export function union<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]>(guards: T, message?: string) {
  return new Errorer(new UnionGuard(guards), (cause) => new Error(message, { cause }))
}
