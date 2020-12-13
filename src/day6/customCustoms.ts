import R from 'ramda'
import { readFile, readFileLines } from '../fileUtils'

const splitOnEmptyLines = R.split('\n\n')

const removeNewlineChars = R.replace(/\n/g, '')

const countUniqueCharsInGroup = R.map(
  R.pipe(
    removeNewlineChars,
    R.split(''),
    (line) => new Set(line),
    R.prop('size')
  )
)

export const main1 = R.pipe(
  readFile,
  splitOnEmptyLines,
  countUniqueCharsInGroup,
  R.sum
)

const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => new Set([...set1].filter(x => set2.has(x)))

export const sharedElements = (lineSets: Set<string>[]): Set<string> => R.reduce((shared: Set<string>, curr: Set<string>) => intersection(shared, curr), lineSets[0])(lineSets)

export const countSharedCharsInGroup = R.pipe(
    R.split('\n'),
    R.map(R.split('')),
    R.map(lineChars => new Set(lineChars)),
    sharedElements,
    R.prop('size')
)

export const main2 = R.pipe(
  readFile,
  R.trim,
  splitOnEmptyLines,
  R.map(countSharedCharsInGroup),
  R.sum
)
