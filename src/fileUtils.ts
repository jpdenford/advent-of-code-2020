import fs from 'fs'
import R from 'ramda'

export const readFile = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString
)

export const readFileLines = R.pipe(
  readFile,
  R.split(/\r?\n/)
)
