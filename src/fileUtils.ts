import fs from 'fs'
import R from 'ramda'

export const readFile = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString
)

export const truthy = <T>(x: T|undefined|null): boolean => !!x // !== null && x !== undefined

export const removeEmpty = R.filter(truthy)

export const readFileLines = R.pipe(
  readFile,
  R.split(/\r?\n/)
)
