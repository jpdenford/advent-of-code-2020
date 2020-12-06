import R from 'ramda'
import { readFile, readFileLines } from '../fileUtils'

const passportDetails = (contents: string) =>
  R.pipe(R.split(/\s+/), R.map(R.split(':')), Object.fromEntries)(contents)

const REQUIRED_FIELDS = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']

const chunkPassports = (fileContents: string) =>
  R.pipe(R.split('\n\n'), R.map(R.replace(/\n/g, ' ')))(fileContents)

const hasAllProperties = (required: string[]) => (obj: object) => {
  const keys = Object.entries(obj)
    .filter((kv) => !!kv[1])
    .map((kv) => kv[0])
  return R.all((r) => keys.includes(r), required)
}

export const main1 = R.pipe(
  readFile,
  chunkPassports,
  R.map(passportDetails),
  R.map(hasAllProperties(REQUIRED_FIELDS)),
  R.filter(R.identity),
  R.length
)
