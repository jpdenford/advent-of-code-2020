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

export const betweenIncl = (min: number, max: number) =>
  R.pipe(
    (i: string) => parseInt(i),
    (num) => num >= min && num <= max
  )

export const validateHeight = R.allPass([
  R.complement(R.isNil),
  (hgt: string) => {
    // TODO probably a nicer way to do this whole thing with cond
    const cmGroups = [...(hgt.match(/([0-9]+)cm/) ?? [])]
    const inGroups = [...(hgt.match(/([0-9]+)in/) ?? [])]
    const cms = cmGroups[1]
    const inchs = inGroups[1]
    return cms ? betweenIncl(150, 193)(cms) : betweenIncl(59, 76)(inchs)
  },
])

export const validatePassport = R.allPass([
  R.pipe(R.prop('byr'), betweenIncl(1920, 2002)),
  R.pipe(R.prop('iyr'), betweenIncl(2010, 2020)),
  R.pipe(R.prop('eyr'), betweenIncl(2020, 2030)),
  R.pipe(R.prop('hgt'), validateHeight),
  R.pipe(R.prop('hcl'), (hcl: string) => /^#[0-9,a-f]{6}$/.test(hcl)),
  R.pipe(R.prop('ecl'), (ecl: string) =>
    /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl)
  ),
  R.pipe(R.prop('pid'), (ecl: string) => /^[0-9]{9}$/.test(ecl)),
])


export const rawInputToPassports = R.pipe(
  chunkPassports,
  R.map(passportDetails)
)

export const main1 = R.pipe(
  readFile,
  rawInputToPassports,
  R.map(hasAllProperties(REQUIRED_FIELDS)),
  R.filter(R.identity),
  R.length
)

export const main2 = R.pipe(
  readFile,
  rawInputToPassports,
  R.map(validatePassport),
  R.filter(R.identity),
  R.length
)