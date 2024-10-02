import { Exact } from "libs/exact/index.js"
import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { AnyGuard, ArrayAndElementsGuard, ArrayAndTupleGuard, AssertGuard, BooleanGuard, NeverGuard, NumberableGuard, NumberGuard, RecordGuard, StrongEqualityGuard, WeakEqualityGuard } from "mods/guards/index.js"
import { StringableGuard, StringGuard, StringGuardBuilder } from "mods/guards/strings/index.js"
import { Property } from "mods/props/index.js"

export function optional<T>(value: T) {
  return new Property.Optional(value)
}

export function readonly<T>(value: T) {
  return new Property.Readonly(value)
}

export function any() {
  return AnyGuard
}

export function assert<T>() {
  return new AssertGuard<T>()
}

export function never(message?: string) {
  return new Errorer(NeverGuard, (cause) => new Error(message, { cause }))
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

export function array<T extends Guard<any, any>>(value: T, message?: string) {
  return new Errorer(new ArrayAndElementsGuard(value), (cause) => new Error(message, { cause }))
}

export function tuple<T extends [Guard<any, any>, ...Guard<any, any>[]]>(value: T, message?: string) {
  return new Errorer(new ArrayAndTupleGuard(value), (cause) => new Error(message, { cause }))
}

export function record<T extends { [k: PropertyKey]: Property<Guard<any, any>> }>(value: T, message?: string) {
  return new Errorer(new RecordGuard(value), (cause) => new Error(message, { cause }))
}