import { Errorer } from "mods/errorer/index.js"
import { ArrayAndElementsGuard, NumberGuard } from "mods/guards/index.js"
import { StringableGuard, StringGuard, StringGuardBuilder } from "mods/guards/strings/index.js"
import { parse } from "mods/parse/index.js"
import { Property } from "mods/props/index.js"

export function optional<T>(value: T) {
  return new Property.Optional(value)
}

export function readonly<T>(value: T) {
  return new Property.Readonly(value)
}

export function array<T>(value: T) {
  return new ArrayAndElementsGuard(parse(value))
}

export function string(message?: string) {
  return new StringGuardBuilder(new Errorer(StringGuard, () => new Error(message)))
}

export function stringable(message?: string) {
  return new StringGuardBuilder(new Errorer(StringableGuard, () => new Error(message)))
}

export function number(message?: string) {
  return new Errorer(NumberGuard, () => new Error(message))
}