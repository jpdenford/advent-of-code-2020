import fs from 'fs'
import R from 'ramda'

export const readFileLines = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString,
  R.split(/\r?\n/)
)
