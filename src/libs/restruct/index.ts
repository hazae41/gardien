/**
 * Restructure `T` to have the same keys as `X`
 */
export type Restruct<X, T> = X extends readonly any[] ? (T extends readonly (infer U)[] ? T extends readonly [any, ...any[]] ? T : { [K in keyof X]: U } : T) : T